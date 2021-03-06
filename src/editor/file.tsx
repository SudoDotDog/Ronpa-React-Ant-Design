/**
 * @author WMXPY
 * @namespace React_Ant_Design_Editor
 * @description File Editor
 */

import { PaperClipOutlined } from "@ant-design/icons";
import { assertIfTri, mergeClasses } from "@sudoo/jss";
import { randomUnique } from "@sudoo/random";
import { Button, Comment, Input } from "antd";
import { Classes } from "jss";
import * as React from "react";
import Dropzone, { DropzoneState } from "react-dropzone";
import { ChangeType, draftAddReplyChange, draftAddThesisChange, FileContent, RECORD_TYPE } from "ronpa";
import { editorStyle } from "../style/editor";
import { RonpaEditorBaseProps, RonpaEditorUploadResult } from "./type";

export type RonpaFileEditorStates = {

    readonly content: string;
    readonly dragHover: boolean;
};

export class RonpaFileEditor extends React.Component<RonpaEditorBaseProps, RonpaFileEditorStates> {

    public readonly state: RonpaFileEditorStates = {

        content: '',
        dragHover: false,
    };

    private readonly _editorStyle: Classes = editorStyle.use();

    public constructor(props: RonpaEditorBaseProps) {

        super(props);

        this._shouldEmit = this._shouldEmit.bind(this);
        this._emitTextAction = this._emitTextAction.bind(this);
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
                        this._emitFileAction(files);
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
            return this.props.actions(this._emitTextAction, this._shouldEmit);
        }
        return (<Button
            className={this._editorStyle.submitButton}
            type="primary"
            onClick={this._emitTextAction}
        >Submit</Button>);
    }

    private _shouldEmit() {

        return this.state.content.length > 0;
    }

    private _emitTextAction() {

        if (!this._shouldEmit()) {
            return;
        }

        if (this.props.onAction) {
            this.props.onAction(this._createTextAction());
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

    private async _emitFileAction(files: File[]) {

        if (!this.props.uploadFile) {
            throw new Error('[Ronpa-React-Ant-Design] Upload File Required');
        }

        if (this.props.onAction) {

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
            this.props.onAction(this._createFileAction(fileContents));
        }
        return;
    }

    private _createFileAction(fileContents: FileContent[]): ChangeType<any, RECORD_TYPE.FILE> {

        const files: FileContent[] = [...fileContents];

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
