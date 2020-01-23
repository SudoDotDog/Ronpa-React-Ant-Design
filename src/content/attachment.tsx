/**
 * @author WMXPY
 * @namespace React_Ant_Design_Content
 * @description Attachment
 */

import { transformSize } from "@sudoo/numeric";
import { Avatar, Icon, List } from "antd";
import * as React from "react";
import { ContentType, FileContent, RECORD_TYPE } from "ronpa";
import { contentStyle } from "../style/content";
import { FileIcon } from "./file-icon";
import { RonpaTextContent } from "./text";
import { RonpaContentBaseProps } from "./type";

export type RonpaAttachmentContentProps = {

    readonly content: ContentType<RECORD_TYPE.ATTACHMENT>;
} & RonpaContentBaseProps;

export class RonpaAttachmentContent extends React.Component<RonpaAttachmentContentProps> {

    private readonly _contentStyle = contentStyle.use();

    public constructor(props: RonpaAttachmentContentProps) {

        super(props);

        this._renderFile = this._renderFile.bind(this);
    }

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

        return (<List
            className={this._contentStyle.list}
            bordered
        >
            {files.map(this._renderFile)}
        </List>);
    }

    private _renderFile(file: FileContent) {

        const sizeText: string = file.size ? transformSize(file.size) : 'Unknown';
        return (<List.Item
            className={this._contentStyle.itemEach}
            key={file.id}
            actions={[
                (<a onClick={() => window.open(file.path)}>View</a>),
            ]}
        >
            <List.Item.Meta
                className={this._contentStyle.itemMeta}
                avatar={<Avatar shape="square">
                    <FileIcon mimeType={file.mimeType} />
                </Avatar>}
                title={file.originalName}
                description={sizeText}
            />
        </List.Item>);
    }
}
