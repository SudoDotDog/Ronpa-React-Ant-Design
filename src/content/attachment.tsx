/**
 * @author WMXPY
 * @namespace React_Ant_Design_Content
 * @description Attachment
 */

import * as React from "react";
import { ContentType, FileContent, RECORD_TYPE } from "ronpa";
import { RonpaCommonFile } from "./common-file";
import { RonpaTextContent } from "./text";
import { RonpaContentBaseProps } from "./type";

export type RonpaAttachmentContentProps = {

    readonly content: ContentType<RECORD_TYPE.ATTACHMENT>;
} & RonpaContentBaseProps;

export class RonpaAttachmentContent extends React.PureComponent<RonpaAttachmentContentProps> {

    public render() {

        const text: string = this.props.content.text;

        return (<RonpaTextContent
            style={this.props.style}
            className={this.props.className}
            thesis={this.props.thesis}
            insiders={this.props.insiders}
            content={text}
            contentLimit={this.props.contentLimit}
        >
            {this._renderFileList()}
        </RonpaTextContent>);
    }

    private _renderFileList() {

        const files: FileContent[] = this.props.content.files;

        if (!files || files.length === 0) {
            return null;
        }

        return (<RonpaCommonFile
            files={files}
        />);
    }
}
