/**
 * @author WMXPY
 * @namespace React_Ant_Design
 * @description Static Editor
 */

import { mergeClasses } from "@sudoo/jss";
import { Button, Comment, Input } from "antd";
import * as React from "react";
import { editorStyle } from "../style/editor";

export type RonpaStaticEditorProps = {

    readonly style?: React.CSSProperties;
    readonly className?: string;

    readonly username: string;

    readonly getAvatar?: (author: string) => string | React.ReactNode;
    readonly onSubmit?: (content: string) => void;
};

export type RonpaStaticEditorStates = {

    readonly content: string;
};

export class RonpaStaticEditor extends React.Component<RonpaStaticEditorProps, RonpaStaticEditorStates> {

    public readonly state: RonpaStaticEditorStates = {

        content: '',
    };

    private readonly _editorStyle = editorStyle.use();

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
                <Input.TextArea
                    value={this.state.content}
                    autoSize={{
                        minRows: 2,
                        maxRows: 6,
                    }}
                    onChange={(value: React.ChangeEvent<HTMLTextAreaElement>) => this.setState({
                        content: value.target.value,
                    })}
                />
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