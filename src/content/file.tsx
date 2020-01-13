/**
 * @author WMXPY
 * @namespace React_Ant_Design_Content
 * @description File
 */

import { Avatar, Icon, List } from "antd";
import * as React from "react";
import { ContentType, FileContent, RECORD_TYPE } from "ronpa";
import { contentStyle } from "../style/content";
import { RonpaBaseContent } from "./base";
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

        return (<div
            className={this._contentStyle.outer}
        >
            <RonpaBaseContent
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
            </RonpaBaseContent>
        </div>);
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
                    <Icon type="file-text" theme="filled" />
                </Avatar>}
                title={file.originalName}
                description={file.mimeType}
            />
        </List.Item>);
    }
}
