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
    readonly maxHeight: number;
};

export class RonpaContent extends React.Component<RonpaContentProps, RonpaContentStates> {

    public readonly state: RonpaContentStates = {

        expended: false,
        maxHeight: 0,
    };

    private readonly _contentStyle = contentStyle.use();
    private _div: HTMLDivElement | null = null;

    public constructor(props: RonpaContentProps) {

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
            {this._renderMain()}
        </div>);
    }

    private _renderMain() {

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

        return (<React.Fragment>
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
        </React.Fragment>);
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

    private _renderInsiders(insiders: string[]) {

        return (<div>
            <Icon type="team" />
            {insiders.map((name: string) =>
                (<span
                    key={name}
                    className={this._contentStyle.username}
                > @{name} </span>),
            )}
        </div>);
    }
}
