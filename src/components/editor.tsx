/**
 * @author WMXPY
 * @namespace React_Ant_Design
 * @description Editor
 */

import { assertIfTri, mergeClasses } from "@sudoo/jss";
import { Button, Comment, Input } from "antd";
import * as React from "react";
import { editorStyle } from "../style/editor";

export type RonpaEditorProps = {

    readonly style?: React.CSSProperties;
    readonly className?: string;

    readonly username: string;
    readonly visible: boolean;

    readonly getAvatar?: (author: string) => string | React.ReactNode;
    readonly onSubmit?: (content: string) => void;
};

export type RonpaEditorStates = {

    readonly content: string;
};

export class RonpaEditor extends React.Component<RonpaEditorProps, RonpaEditorStates> {

    public readonly state: RonpaEditorStates = {

        content: '',
    };

    private readonly _editorStyle = editorStyle.use();

    public constructor(props: RonpaEditorProps) {

        super(props);
    }

    public render() {

        return (<Comment
            className={mergeClasses(
                this._editorStyle.editor,
                assertIfTri(this.props.visible, this._editorStyle.visible, this._editorStyle.invisible),
            )}
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
            </div>}
        >
            <Button
                type="primary"
                onClick={() => this.props.onSubmit(this.state.content)}
            >Submit</Button>
        </Comment>);
    }

    private _getAvatar(username: string): string | React.ReactNode | undefined {

        if (this.props.getAvatar) {
            return this.props.getAvatar(username);
        }
        return undefined;
    }
}
