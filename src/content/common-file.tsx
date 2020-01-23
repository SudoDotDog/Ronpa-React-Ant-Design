/**
 * @author WMXPY
 * @namespace React_Ant_Design_Content
 * @description Common File
 */

import { transformSize } from "@sudoo/numeric";
import { Avatar, List } from "antd";
import * as React from "react";
import { ContentType, FileContent, RECORD_TYPE } from "ronpa";
import { fileStyle } from "../style/file";
import { RonpaBaseContent } from "./base";
import { FileIcon } from "./file-icon";

export type RonpaCommonFileProps = {

    readonly files: FileContent[];
};

export class RonpaCommonFile extends React.PureComponent<RonpaCommonFileProps> {

    private readonly _fileStyle = fileStyle.use();

    public constructor(props: RonpaCommonFileProps) {

        super(props);

        this._renderFile = this._renderFile.bind(this);
    }

    public render() {

        return (<List
            className={this._fileStyle.list}
            bordered
        >
            {this.props.files.map(this._renderFile)}
        </List>);
    }

    private _renderFile(file: FileContent) {

        const sizeText: string = file.size ? transformSize(file.size) : 'Unknown';
        return (<List.Item
            className={this._fileStyle.itemEach}
            key={file.id}
            actions={[
                (<a onClick={() => window.open(file.path)}>View</a>),
            ]}
        >
            <List.Item.Meta
                className={this._fileStyle.itemMeta}
                avatar={<Avatar shape="square">
                    <FileIcon mimeType={file.mimeType} />
                </Avatar>}
                title={file.originalName}
                description={sizeText}
            />
        </List.Item>);
    }
}
