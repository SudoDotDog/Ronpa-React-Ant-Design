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

        return (<div
            className={this._fileStyle.list}
        >
            {this.props.files.map(this._renderFile)}
        </div>);
    }

    private _renderFile(file: FileContent) {

        const sizeText: string = file.size ? transformSize(file.size) : 'Unknown';
        return (<div
            className={this._fileStyle.item}
            key={file.id}
        >
            <div className={this._fileStyle.icon}>
                <Avatar shape="square">
                    <FileIcon mimeType={file.mimeType} />
                </Avatar>
            </div>
            <div className={this._fileStyle.name}>
                {file.originalName}
            </div>
            <div className={this._fileStyle.size}>
                {sizeText}
            </div>
            <div className={this._fileStyle.action}>
                <a onClick={() => window.open(file.path)}>View</a>
            </div>
        </div>);
    }
}
