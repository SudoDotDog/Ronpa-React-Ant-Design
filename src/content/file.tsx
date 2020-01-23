/**
 * @author WMXPY
 * @namespace React_Ant_Design_Content
 * @description File
 */

import * as React from "react";
import { ContentType, RECORD_TYPE } from "ronpa";
import { contentStyle } from "../style/content";
import { RonpaBaseContent } from "./base";
import { RonpaCommonFile } from "./common-file";
import { RonpaContentBaseProps } from "./type";

export type RonpaFileContentProps = {

    readonly content: ContentType<RECORD_TYPE.FILE>;
} & RonpaContentBaseProps;

export class RonpaFileContent extends React.Component<RonpaFileContentProps> {

    private readonly _contentStyle = contentStyle.use();

    public constructor(props: RonpaFileContentProps) {

        super(props);
    }

    public render() {

        return (<RonpaBaseContent
            style={this.props.style}
            className={this.props.className}
            thesis={this.props.thesis}
            insiders={this.props.insiders}
            contentLimit={this.props.contentLimit}
        >
            <RonpaCommonFile
                files={this.props.content}
            />
        </RonpaBaseContent>);
    }
}
