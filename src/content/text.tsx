/**
 * @author WMXPY
 * @namespace React_Ant_Design_Content
 * @description Text
 */

import { Icon } from "antd";
import * as React from "react";
import { ContentType, RECORD_TYPE } from "ronpa";
import { contentStyle } from "../style/content";
import { RonpaBaseContent } from "./base";
import { RonpaContentBaseProps } from "./type";

export type RonpaTextContentProps = {

    readonly content: ContentType<RECORD_TYPE.TEXT>;
} & RonpaContentBaseProps;

export type RonpaTextContentStates = {

    readonly expended: boolean;
    readonly maxHeight: number;
};

export class RonpaTextContent extends React.Component<RonpaTextContentProps, RonpaTextContentStates> {

    public readonly state: RonpaTextContentStates = {

        expended: false,
        maxHeight: 0,
    };

    private readonly _contentStyle = contentStyle.use();
    private _div: HTMLDivElement | null = null;

    public constructor(props: RonpaTextContentProps) {

        super(props);

        this._expendContent = this._expendContent.bind(this);
    }

    public render() {

        return (<div
            ref={(ref: HTMLDivElement) => this._div = ref}
            className={this._contentStyle.outer}
            style={{
                maxHeight: this.state.maxHeight === 0 ? 'none' : this.state.maxHeight,
            }}
        >
            <RonpaBaseContent
                style={this.props.style}
                className={this.props.className}
                thesis={this.props.thesis}
                insiders={this.props.insiders}
                contentLimit={this.props.contentLimit}
            >
                {this._renderContent()}
            </RonpaBaseContent>
        </div>);
    }

    private _renderContent() {

        if (!this.props.contentLimit || this.state.expended) {
            return this.props.content;
        }

        if (this.props.content.length > this.props.contentLimit) {

            return (<div>
                <div>{this.props.content.substring(0, this.props.contentLimit) + '...'}</div>
                <a
                    className={this._contentStyle.restButton}
                    onClick={this._expendContent}
                >
                    Rest {this.props.content.length - this.props.contentLimit} Characters...
                </a>
            </div>);
        }

        return this.props.content;
    }

    private _expendContent() {

        if (!this._div) {
            return;
        }

        this.setState({
            expended: true,
            maxHeight: this._div.scrollHeight,
        }, () => {

            if (!this._div) {
                return;
            }

            this.setState({
                maxHeight: this._div.scrollHeight,
            });
        });
    }
}
