/**
 * @author WMXPY
 * @namespace React_Ant_Design
 * @description Content
 */

import { mergeClasses } from "@sudoo/jss";
import { Icon } from "antd";
import * as React from "react";
import { Thesis } from "ronpa";
import { contentStyle } from "../style/content";

export type RonpaContentProps = {

    readonly style?: React.CSSProperties;
    readonly className?: string;

    readonly content: string;

    readonly thesis?: Thesis;

    readonly insiders?: boolean;
    readonly contentLimit?: number;
};

export type RonpaContentStates = {

    readonly expended: boolean;
};

export class RonpaContent extends React.Component<RonpaContentProps, RonpaContentStates> {

    public readonly state: RonpaContentStates = {

        expended: false,
    };

    private readonly _contentStyle = contentStyle.use();

    public constructor(props: RonpaContentProps) {

        super(props);
    }

    public render() {

        if (!this.props.thesis || this.props.thesis.insiders.length === 0) {
            return (<div
                style={this.props.style}
                className={mergeClasses(
                    this.props.className,
                    this._contentStyle.content,
                )}
            >
                {this._renderContent()}
            </div>);
        }

        return (<div>
            {this._renderInsiders(this.props.thesis.insiders)}
            <div
                style={this.props.style}
                className={mergeClasses(
                    this.props.className,
                    this._contentStyle.content,
                )}
            >
                {this._renderContent()}
            </div>
        </div>);
    }

    private _renderContent() {

        if (!this.props.contentLimit) {
            return this.props.content;
        }

        if (this.props.content.length > this.props.contentLimit) {

            return (<div>
                <div>{this.props.content.substring(0, this.props.contentLimit) + '...'}</div>
                <div>Rest {this.props.content.length - this.props.contentLimit}</div>
            </div>);
        }

        return this.props.content;
    }

    private _renderInsiders(insiders: string[]) {

        return (<div>
            <Icon type="team" />
            {insiders.map((name: string) =>
                (<span className={this._contentStyle.username}> @{name} </span>),
            )}
        </div>);
    }
}
