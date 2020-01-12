/**
 * @author WMXPY
 * @namespace React_Ant_Design_Editor
 * @description Editor
 */

import { assertIfTri, mergeClasses } from "@sudoo/jss";
import { Classes } from "jss";
import * as React from "react";
import { editorStyle } from "../style/editor";
import { RonpaStaticEditor } from "./static";
import { RonpaEditorBaseProps } from "./type";

export type RonpaEditorProps = {

    readonly visible: boolean;
} & RonpaEditorBaseProps;

export class RonpaEditor extends React.Component<RonpaEditorProps> {

    private readonly _editorStyle: Classes = editorStyle.use();

    public constructor(props: RonpaEditorProps) {

        super(props);
    }

    public render() {

        return (<RonpaStaticEditor

            style={this.props.style}
            className={mergeClasses(
                this.props.className,
                assertIfTri(this.props.visible, this._editorStyle.visible, this._editorStyle.invisible),
            )}

            insiders={this.props.insiders}
            story={this.props.story}
            reply={this.props.reply}

            username={this.props.username}
            getAvatar={this.props.getAvatar}
            onAction={this.props.onAction}
        />);
    }
}
