/**
 * @author WMXPY
 * @namespace React_Ant_Design_Content
 * @description File
 */

import { transformSize } from "@sudoo/numeric";
import { Avatar, Icon, List } from "antd";
import * as React from "react";
import { ContentType, FileContent, RECORD_TYPE } from "ronpa";
import { contentStyle } from "../style/content";
import { RonpaBaseContent } from "./base";
import { FileIcon } from "./file-icon";
import { RonpaContentBaseProps } from "./type";

export type RonpaFileContentProps = {

    readonly content: ContentType<RECORD_TYPE.FILE>;
} & RonpaContentBaseProps;

export class RonpaFileContent extends React.Component<RonpaFileContentProps> {

    private readonly _contentStyle = contentStyle.use();

    public constructor(props: RonpaFileContentProps) {

        super(props);

        this._renderFile = this._renderFile.bind(this);
    }

    public render() {

        return (<RonpaBaseContent
            style={this.props.style}
            className={this.props.className}
            thesis={this.props.thesis}
            insiders={this.props.insiders}
            contentLimit={this.props.contentLimit}
        >
            <List
                className={this._contentStyle.list}
                bordered
            >
                {this.props.content.map(this._renderFile)}
            </List>
        </RonpaBaseContent>);
    }

    private _renderFile(file: FileContent) {

        const sizeText: string = file.size ? transformSize(file.size) : 'Unknown';
        return (<List.Item
            className={this._contentStyle.itemEach}
            key={file.id}
            actions={[
                (<a onClick={() => window.open(file.path)}><Icon type="download" /> Download</a>),
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
