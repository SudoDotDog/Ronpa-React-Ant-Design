/**
 * @author WMXPY
 * @namespace React_Ant_Design_Editor
 * @description Attachment Editor
 */

import { assertIfTri, mergeClasses } from "@sudoo/jss";
import { randomUnique } from "@sudoo/random";
import { Button, Comment, Icon, Input, Tag } from "antd";
import { Classes } from "jss";
import * as React from "react";
import Dropzone, { DropzoneState } from "react-dropzone";
import { ChangeType, draftAddReplyChange, draftAddThesisChange, FileContent, RECORD_TYPE } from "ronpa";
import { editorStyle } from "../style/editor";
import { RonpaEditorBaseProps, RonpaEditorUploadResult } from "./type";

export type RonpaAttachmentEditorStates = {

    readonly content: string;
    readonly files: FileContent[];
    readonly dragHover: boolean;
};

export class RonpaAttachmentEditor extends React.Component<RonpaEditorBaseProps, RonpaAttachmentEditorStates> {

    public readonly state: RonpaAttachmentEditorStates = {

        content: '',
        files: [],
        dragHover: false,
    };

    private readonly _editorStyle: Classes = editorStyle.use();

    public constructor(props: RonpaEditorBaseProps) {

        super(props);

        this._emitAction = this._emitAction.bind(this);
    }

    public render() {

        return (<Comment
            className={mergeClasses(
                this.props.className,
                this._editorStyle.editor,
            )}
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
                            <Button
                                type="ghost"
                                block
                                className={mergeClasses(
                                    this._editorStyle.uploadIndicator,
                                )}
                                onClick={state.open}
                            >
                                <Icon type="paper-clip" />
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
                                <Icon type="paper-clip" />&nbsp;
                                Release to Upload
                            </div>
                        </div>);
                    }}
                </Dropzone>
                <Button
                    className={this._editorStyle.submitButton}
                    type="primary"
                    onClick={this._emitAction}
                >Submit</Button>
            </div>}
        />);
    }

    private _renderFiles() {

        if (this.state.files.length === 0) {
            return null;
        }

        return (<div className={this._editorStyle.attachmentContainer}>
            {this.state.files.map((file: FileContent) => <Tag
                key={file.id}
                closable
                onClose={(e: Event) => {
                    e.preventDefault();
                    this.setState({
                        files: this.state.files.filter((current: FileContent) => current.id !== file.id),
                    });
                }}
            >{file.originalName}</Tag>)}
        </div>);
    }

    private _emitAction() {

        if (this.props.onAction) {

            if (this.state.files.length === 0) {
                this.props.onAction(this._createTextAction());
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

    private async _uploadFile(files: File[]) {

        if (!this.props.uploadFile) {
            throw new Error('[Ronpa-React-Ant-Design] Upload File Required');
        }

        const fileContents: FileContent[] = [];
        for (const file of files) {
            const result: RonpaEditorUploadResult = await this.props.uploadFile(file);
            fileContents.push({
                id: randomUnique(),
                path: result.path,
                originalName: file.name,
                mimeType: file.type,
                size: file.size,
                lastModifyAt: new Date(file.lastModified),
                uploadedAt: result.uploadedAt,
            });
        }
        this.setState({
            files: [
                ...this.state.files,
                ...fileContents,
            ],
        });
    }

    private _createAttachmentAction(): ChangeType<any, RECORD_TYPE.ATTACHMENT> {

        if (this.props.story) {

            return draftAddReplyChange({
                by: this.props.username,
                content: {
                    text: this.state.content,
                    files: this.state.files,
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
                files: this.state.files,
            },
            insiders: this.props.insiders ?? [],
            type: RECORD_TYPE.ATTACHMENT,
        });
    }

    private _getAvatar(username: string): string | React.ReactNode | undefined {

        if (this.props.getAvatar) {
            return this.props.getAvatar(username);
        }
        return undefined;
    }
}
