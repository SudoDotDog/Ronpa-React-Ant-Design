/**
 * @author WMXPY
 * @namespace React_Ant_Design
 * @description Static Editor
 */

import { assertIfTri, assertIfTrue, mergeClasses } from "@sudoo/jss";
import { Button, Comment, Icon, Input } from "antd";
import { Classes } from "jss";
import * as React from "react";
import Dropzone, { DropzoneState } from "react-dropzone";
import { editorStyle } from "../style/editor";

export type RonpaStaticEditorProps = {

    readonly style?: React.CSSProperties;
    readonly className?: string;

    readonly username: string;

    readonly getAvatar?: (author: string) => string | React.ReactNode;
    readonly onSubmit?: (content: string) => void;

    readonly allowFile?: boolean;
};

export type RonpaStaticEditorStates = {

    readonly content: string;
    readonly dragHover: boolean;
};

export class RonpaStaticEditor extends React.Component<RonpaStaticEditorProps, RonpaStaticEditorStates> {

    public readonly state: RonpaStaticEditorStates = {

        content: '',
        dragHover: false,
    };

    private readonly _editorStyle: Classes = editorStyle.use();

    public constructor(props: RonpaStaticEditorProps) {

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
                {this.props.allowFile ? this._renderFileTextArea() : this._renderBasicTextArea()}
                <Button
                    className={this._editorStyle.submitButton}
                    type="primary"
                    onClick={this._submitChange}
                >Submit</Button>
            </div>}
        />);
    }

    private _renderBasicTextArea() {

        return (<Input.TextArea
            value={this.state.content}
            autoSize={{
                minRows: 2,
                maxRows: 6,
            }}
            className={mergeClasses(
                assertIfTrue(this.props.allowFile, this._editorStyle.textAreaWithDrop),
            )}
            onChange={(value: React.ChangeEvent<HTMLTextAreaElement>) => this.setState({
                content: value.target.value,
            })}
        />);
    }

    private _renderFileTextArea() {

        return (<Dropzone
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

                >
                    <Input.TextArea
                        draggable={false}
                        value={this.state.content}
                        autoSize={{
                            minRows: 2,
                            maxRows: 6,
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
                        )}>
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
        </Dropzone>);
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
