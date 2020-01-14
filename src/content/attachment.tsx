/**
 * @author WMXPY
 * @namespace React_Ant_Design_Content
 * @description Attachment
 */

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
        const files: FileContent[] = this.props.content.files;

        return (<RonpaTextContent
            style={this.props.style}
            className={this.props.className}
            thesis={this.props.thesis}
            insiders={this.props.insiders}
            content={text}
            contentLimit={this.props.contentLimit}
        >
            <List
                className={this._contentStyle.list}
                bordered
            >
                {files.map(this._renderFile)}
            </List>
        </RonpaTextContent>);
    }

    private _renderFile(file: FileContent) {

        return (<List.Item
            key={file.id}
            actions={[
                (<a onClick={() => window.open(file.path)}><Icon type="download" /> Download</a>),
            ]}
        >
            <List.Item.Meta
                avatar={<Avatar shape="square">
                    <FileIcon mimeType={file.mimeType} />
                </Avatar>}
                title={file.originalName}
                description={file.size}
            />
        </List.Item>);
    }
}
