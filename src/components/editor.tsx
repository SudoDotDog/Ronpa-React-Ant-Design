/**
 * @author WMXPY
 * @namespace React_Ant_Design
 * @description Editor
 */

import { assertIfTri, mergeClasses } from "@sudoo/jss";
import * as React from "react";
import { editorStyle } from "../style/editor";
import { RonpaStaticEditor, RonpaStaticEditorProps } from "./static";

export type RonpaEditorProps = {

    readonly visible: boolean;
} & RonpaStaticEditorProps;

export class RonpaEditor extends React.Component<RonpaEditorProps> {

    private readonly _editorStyle = editorStyle.use();

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

            username={this.props.username}
            getAvatar={this.props.getAvatar}
            onSubmit={this.props.onSubmit}
        />);
    }
}
