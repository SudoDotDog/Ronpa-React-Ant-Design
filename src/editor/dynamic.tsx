/**
 * @author WMXPY
 * @namespace React_Ant_Design_Editor
 * @description Dynamic Editor
 */

import { LoadingOutlined, PaperClipOutlined } from "@ant-design/icons";
import { assertIfTri, mergeClasses } from "@sudoo/jss";
import { randomUnique } from "@sudoo/random";
import { Button, Comment, Input, Tag } from "antd";
import { Classes } from "jss";
import * as React from "react";
import Dropzone, { DropzoneState } from "react-dropzone";
import { ChangeType, draftAddReplyChange, draftAddThesisChange, FileContent, RECORD_TYPE } from "ronpa";
import { FileIcon } from "../content/file-icon";
import { editorStyle } from "../style/editor";
import { RonpaEditorBaseProps, RonpaEditorUploadResult } from "./type";

type UploadingFile = Pick<FileContent, 'id' | 'originalName' | 'mimeType' | 'size' | 'lastModifyAt'>;

export type RonpaDynamicEditorStates = {

    readonly content: string;
    readonly files: FileContent[];
    readonly uploading: UploadingFile[];
    readonly dragHover: boolean;
};

export class RonpaDynamicEditor extends React.Component<RonpaEditorBaseProps, RonpaDynamicEditorStates> {

    public readonly state: RonpaDynamicEditorStates = {

        content: '',
        files: [],
        uploading: [],
        dragHover: false,
    };

    private readonly _editorStyle: Classes = editorStyle.use();

    public constructor(props: RonpaEditorBaseProps) {

        super(props);

        this._shouldEmit = this._shouldEmit.bind(this);
        this._emitAction = this._emitAction.bind(this);
    }

    public render() {

        return (<Comment
            className={this.props.className}
            style={this.props.style}
            avatar={this._getAvatar(this.props.username)}
            content={<div>
                <Dropzone
                    onDragEnter={() => this.setState({ dragHover: true })}
                    onDragLeave={() => this.setState({ dragHover: false })}
                    onDrop={(files: File[]) => {
                        this.setState({
                            dragHover: false,
                        });
                        this._uploadFile(files);
                    }}
                >
                    {(state: DropzoneState) => {
                        return (<div
                            {...state.getRootProps({
                                className: this._editorStyle.draggable,
                            })}
                            onClick={(e: React.MouseEvent) => e.preventDefault()}
                        >
                            <input {...state.getInputProps()} />
                            <Input.TextArea
                                draggable={false}
                                value={this.state.content}
                                autoSize={{
                                    minRows: 3,
                                    maxRows: 8,
                                }}
                                className={mergeClasses(
                                    this._editorStyle.textAreaWithDrop,
                                )}
                                onChange={(value: React.ChangeEvent<HTMLTextAreaElement>) => this.setState({
                                    content: value.target.value,
                                })}
                            />
                            {this._renderFiles()}
                            {this._renderUploadings()}
                            <Button
                                type="ghost"
                                block
                                className={mergeClasses(
                                    this._editorStyle.uploadIndicator,
                                )}
                                onClick={state.open}
                            >
                                <PaperClipOutlined />
                                Drag or Click
                            </Button>
                            <div
                                {...state.getRootProps({
                                    className: mergeClasses(
                                        this._editorStyle.dragContent,
                                        assertIfTri(
                                            this.state.dragHover,
                                            this._editorStyle.dragging,
                                            this._editorStyle.notDragging,
                                        ),
                                    ),
                                })}
                            >
                                <PaperClipOutlined />&nbsp;
                                Release to Upload
                            </div>
                        </div>);
                    }}
                </Dropzone>
                {this._renderActions()}
            </div>}
        />);
    }

    private _renderActions() {

        if (this.props.actions) {
            return this.props.actions(this._emitAction, this._shouldEmit);
        }
        return (<Button
            className={this._editorStyle.submitButton}
            type="primary"
            onClick={this._emitAction}
        >Submit</Button>);
    }

    private _renderFiles() {

        if (this.state.files.length === 0) {
            return null;
        }

        return (<div className={this._editorStyle.attachmentContainer}>
            {this.state.files.map((file: FileContent) => <Tag
                key={file.id}
                closable
                color="blue"
                onClose={(e: Event) => {
                    e.preventDefault();
                    this.setState({
                        files: this.state.files.filter((current: FileContent) => current.id !== file.id),
                    });
                }}
            ><FileIcon mimeType={file.mimeType} /> {file.originalName}</Tag>)}
        </div>);
    }

    private _renderUploadings() {

        if (this.state.uploading.length === 0) {
            return null;
        }

        return (<div className={this._editorStyle.attachmentContainer}>
            {this.state.uploading.map((file: UploadingFile) => <Tag
                key={file.id}
                color="orange"
            ><LoadingOutlined /> {file.originalName}</Tag>)}
        </div>);
    }

    private _shouldEmit() {

        return this.state.content.length > 0 || this.state.files.length > 0;
    }

    private _emitAction() {

        if (!this._shouldEmit()) {
            return;
        }

        if (this.props.onAction) {

            if (this.state.files.length === 0) {
                this.props.onAction(this._createTextAction());
            } else if (this.state.content.length === 0) {
                this.props.onAction(this._createFileAction());
            } else {
                this.props.onAction(this._createAttachmentAction());
            }
        }
        return;
    }

    private _createTextAction(): ChangeType<any, RECORD_TYPE.TEXT> {

        if (this.props.story) {

            return draftAddReplyChange({
                by: this.props.username,
                content: this.state.content,
                story: this.props.story,
                reply: this.props.reply,
                type: RECORD_TYPE.TEXT,
            });
        }

        return draftAddThesisChange({
            by: this.props.username,
            content: this.state.content,
            insiders: this.props.insiders ?? [],
            type: RECORD_TYPE.TEXT,
        });
    }

    private _uploadFile(files: File[]) {

        if (!this.props.uploadFile) {
            throw new Error('[Ronpa-React-Ant-Design] Upload File Required');
        }

        const uploading: UploadingFile[] = [];
        for (const file of files) {

            const upload: UploadingFile = {
                id: randomUnique(),
                originalName: file.name,
                mimeType: file.type,
                size: file.size,
                lastModifyAt: new Date(file.lastModified),
            };

            Promise.resolve(this.props.uploadFile(file)).then((result: RonpaEditorUploadResult) => {
                const content: FileContent = {
                    ...upload,
                    path: result.path,
                    uploadedAt: result.uploadedAt,
                };

                this.setState({
                    files: [
                        ...this.state.files,
                        content,
                    ],
                });
            }).catch((_: any) => {
                return;
            }).finally(() => {
                this.setState({
                    uploading: this.state.uploading.filter((each: UploadingFile) => each.id !== upload.id),
                });
            });
            uploading.push(upload);
        }
        this.setState({
            uploading: [
                ...this.state.uploading,
                ...uploading,
            ],
        });
    }

    private _createAttachmentAction(): ChangeType<any, RECORD_TYPE.ATTACHMENT> {

        const files: FileContent[] = [...this.state.files];

        if (this.props.story) {

            return draftAddReplyChange({
                by: this.props.username,
                content: {
                    text: this.state.content,
                    files,
                },
                story: this.props.story,
                reply: this.props.reply,
                type: RECORD_TYPE.ATTACHMENT,
            });
        }

        return draftAddThesisChange({
            by: this.props.username,
            content: {
                text: this.state.content,
                files,
            },
            insiders: this.props.insiders ?? [],
            type: RECORD_TYPE.ATTACHMENT,
        });
    }

    private _createFileAction(): ChangeType<any, RECORD_TYPE.FILE> {

        const files: FileContent[] = [...this.state.files];

        if (this.props.story) {

            return draftAddReplyChange({
                by: this.props.username,
                content: files,
                story: this.props.story,
                reply: this.props.reply,
                type: RECORD_TYPE.FILE,
            });
        }

        return draftAddThesisChange({
            by: this.props.username,
            content: files,
            insiders: this.props.insiders ?? [],
            type: RECORD_TYPE.FILE,
        });
    }

    private _getAvatar(username: string): string | React.ReactNode | undefined {

        if (this.props.getAvatar) {
            return this.props.getAvatar(username);
        }
        return undefined;
    }
}
