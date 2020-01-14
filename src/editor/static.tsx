/**
 * @author WMXPY
 * @namespace React_Ant_Design_Editor
 * @description Static Editor
 */

import { mergeClasses } from "@sudoo/jss";
import { Button, Comment, Input } from "antd";
import { Classes } from "jss";
import * as React from "react";
import { ChangeType, draftAddReplyChange, draftAddThesisChange, RECORD_TYPE } from "ronpa";
import { editorStyle } from "../style/editor";
import { RonpaEditorBaseProps } from "./type";

export type RonpaStaticEditorStates = {

    readonly content: string;
};

export class RonpaStaticEditor extends React.Component<RonpaEditorBaseProps, RonpaStaticEditorStates> {

    public readonly state: RonpaStaticEditorStates = {

        content: '',
    };

    private readonly _editorStyle: Classes = editorStyle.use();

    public constructor(props: RonpaEditorBaseProps) {

        super(props);

        this._emitTextAction = this._emitTextAction.bind(this);
    }

    public render() {

        return (<Comment
            className={this.props.className}
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
                {this._renderActions()}
            </div>}
        />);
    }

    private _renderActions() {

        if (this.props.actions) {
            return this.props.actions(this._emitTextAction);
        }
        return (<Button
            className={this._editorStyle.submitButton}
            type="primary"
            onClick={this._emitTextAction}
        >Submit</Button>);
    }

    private _emitTextAction() {

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

    private _getAvatar(username: string): string | React.ReactNode | undefined {

        if (this.props.getAvatar) {
            return this.props.getAvatar(username);
        }
        return undefined;
    }
}
