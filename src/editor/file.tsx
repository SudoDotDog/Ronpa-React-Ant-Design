/**
 * @author WMXPY
 * @namespace React_Ant_Design
 * @description Static Editor
 */

import { assertIfTri, mergeClasses } from "@sudoo/jss";
import { Button, Comment, Icon, Input } from "antd";
import { Classes } from "jss";
import * as React from "react";
import Dropzone, { DropzoneState } from "react-dropzone";
import { editorStyle } from "../style/editor";

export type RonpaFileEditorProps = {

    readonly style?: React.CSSProperties;
    readonly className?: string;

    readonly username: string;

    readonly getAvatar?: (author: string) => string | React.ReactNode;
    readonly onSubmit?: (content: string) => void;
};

export type RonpaFileEditorStates = {

    readonly content: string;
    readonly dragHover: boolean;
};

export class RonpaFileEditor extends React.Component<RonpaFileEditorProps, RonpaFileEditorStates> {

    public readonly state: RonpaFileEditorStates = {

        content: '',
        dragHover: false,
    };

    private readonly _editorStyle: Classes = editorStyle.use();

    public constructor(props: RonpaFileEditorProps) {

        super(props);

        this._submitChange = this._submitChange.bind(this);
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
                        console.log(files);
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
                                <Icon type="paper-clip" />
                                Drag or Click
                            </Button>
                            <div
                                {...state.getRootProps({
                                    className: mergeClasses(
                                        this._editorStyle.dragContent,
                                        assertIfTri(this.state.dragHover, this._editorStyle.dragging, this._editorStyle.notDragging),
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
                    onClick={this._submitChange}
                >Submit</Button>
            </div>}
        />);
    }

    private _submitChange() {

        if (this.props.onSubmit) {
            this.props.onSubmit(this.state.content);
        }
        return;
    }

    private _getAvatar(username: string): string | React.ReactNode | undefined {

        if (this.props.getAvatar) {
            return this.props.getAvatar(username);
        }
        return undefined;
    }
}
