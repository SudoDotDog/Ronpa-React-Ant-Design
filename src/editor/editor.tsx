/**
 * @author WMXPY
 * @namespace React_Ant_Design_Editor
 * @description Editor
 */

import { assertIfTri, mergeClasses } from "@sudoo/jss";
import { Classes } from "jss";
import * as React from "react";
import { editorStyle } from "../style/editor";
import { RonpaAttachmentEditor } from "./attachment";
import { RonpaFileEditor } from "./file";
import { RonpaStaticEditor } from "./static";
import { EditorMode, RonpaEditorBaseProps } from "./type";

export type RonpaEditorProps = {

    readonly visible: boolean;

    readonly mode?: EditorMode;
} & RonpaEditorBaseProps;

export class RonpaEditor extends React.Component<RonpaEditorProps> {

    private readonly _editorStyle: Classes = editorStyle.use();

    public constructor(props: RonpaEditorProps) {

        super(props);
    }

    public render() {

        const mode: EditorMode | undefined = this.props.mode;
        if (!mode || mode === 'text') {
            return this._renderStaticEditor();
        } else if (mode === 'attachment') {
            return this._renderAttachmentEditor();
        } else if (mode === 'file') {
            return this._renderFileEditor();
        }
        return null;
    }

    private _renderStaticEditor() {

        return (<RonpaStaticEditor

            style={this.props.style}
            className={mergeClasses(
                this.props.className,
                assertIfTri(
                    this.props.visible,
                    this._editorStyle.visible,
                    this._editorStyle.invisible,
                ),
            )}

            username={this.props.username}

            insiders={this.props.insiders}
            story={this.props.story}
            reply={this.props.reply}

            getAvatar={this.props.getAvatar}
            onAction={this.props.onAction}
        />);
    }

    private _renderFileEditor() {

        return (<RonpaFileEditor

            style={this.props.style}
            className={mergeClasses(
                this.props.className,
                assertIfTri(
                    this.props.visible,
                    this._editorStyle.visible,
                    this._editorStyle.invisible,
                ),
            )}

            username={this.props.username}

            insiders={this.props.insiders}
            story={this.props.story}
            reply={this.props.reply}

            getAvatar={this.props.getAvatar}
            uploadFile={this.props.uploadFile}
            onAction={this.props.onAction}
        />);
    }

    private _renderAttachmentEditor() {

        return (<RonpaAttachmentEditor

            style={this.props.style}
            className={mergeClasses(
                this.props.className,
                assertIfTri(
                    this.props.visible,
                    this._editorStyle.visible,
                    this._editorStyle.invisible,
                ),
            )}

            username={this.props.username}

            insiders={this.props.insiders}
            story={this.props.story}
            reply={this.props.reply}

            getAvatar={this.props.getAvatar}
            uploadFile={this.props.uploadFile}
            onAction={this.props.onAction}
        />);
    }
}
