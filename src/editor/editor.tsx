/**
 * @author WMXPY
 * @namespace React_Ant_Design_Editor
 * @description Editor
 */

import { Classes } from "jss";
import * as React from "react";
import { editorStyle } from "../style/editor";
import { RonpaAttachmentEditor } from "./attachment";
import { RonpaDynamicEditor } from "./dynamic";
import { RonpaFileEditor } from "./file";
import { RonpaStaticEditor } from "./static";
import { EditorMode, RonpaEditorBaseProps } from "./type";

export type RonpaEditorProps = {

    readonly visible: boolean;

    readonly mode?: EditorMode;
} & RonpaEditorBaseProps;

export class RonpaEditor extends React.Component<RonpaEditorProps> {

    private readonly _editorStyle: Classes = editorStyle.use();
    private readonly _container: React.RefObject<HTMLDivElement> = React.createRef();

    public render() {

        return (<div
            style={this._getEditorStyle()}
            className={this._editorStyle.editor}
            ref={this._container}
        >
            {this._renderEditor()}
        </div>);
    }

    private _renderEditor() {

        const mode: EditorMode | undefined = this.props.mode;
        if (!mode || mode === 'text') {
            return this._renderStaticEditor();
        } else if (mode === 'dynamic') {
            return this._renderDynamicEditor();
        } else if (mode === 'attachment') {
            return this._renderAttachmentEditor();
        } else if (mode === 'file') {
            return this._renderFileEditor();
        }
        return null;
    }

    private _renderStaticEditor() {

        return (<RonpaStaticEditor
            className={this.props.className}

            username={this.props.username}

            insiders={this.props.insiders}
            story={this.props.story}
            reply={this.props.reply}

            getAvatar={this.props.getAvatar}
            onAction={this.props.onAction}

            actions={this.props.actions}
        />);
    }

    private _renderFileEditor() {

        return (<RonpaFileEditor
            className={this.props.className}

            username={this.props.username}

            insiders={this.props.insiders}
            story={this.props.story}
            reply={this.props.reply}

            getAvatar={this.props.getAvatar}
            uploadFile={this.props.uploadFile}
            onAction={this.props.onAction}

            actions={this.props.actions}
        />);
    }

    private _renderAttachmentEditor() {

        return (<RonpaAttachmentEditor
            className={this.props.className}

            username={this.props.username}

            insiders={this.props.insiders}
            story={this.props.story}
            reply={this.props.reply}

            getAvatar={this.props.getAvatar}
            uploadFile={this.props.uploadFile}
            onAction={this.props.onAction}

            actions={this.props.actions}
        />);
    }

    private _renderDynamicEditor() {

        return (<RonpaDynamicEditor
            className={this.props.className}

            username={this.props.username}

            insiders={this.props.insiders}
            story={this.props.story}
            reply={this.props.reply}

            getAvatar={this.props.getAvatar}
            uploadFile={this.props.uploadFile}
            onAction={this.props.onAction}

            actions={this.props.actions}
        />);
    }

    private _getEditorStyle(): React.CSSProperties | undefined {

        if (!this._container.current) {
            return {
                ...this.props.style,
                maxHeight: '0px',
                opacity: 0,
            };
        }

        if (!this.props.visible) {
            return {
                ...this.props.style,
                maxHeight: '0px',
                opacity: 0,
            };
        }

        return {
            ...this.props.style,
            maxHeight: '512px',
            opacity: 1,
        };
    }
}
