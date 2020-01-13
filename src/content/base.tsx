/**
 * @author WMXPY
 * @namespace React_Ant_Design_Content
 * @description Base
 */

import { mergeClasses } from "@sudoo/jss";
import { Icon } from "antd";
import * as React from "react";
import { contentStyle } from "../style/content";
import { RonpaContentBaseProps } from "./type";

export class RonpaBaseContent extends React.Component<RonpaContentBaseProps> {

    private readonly _contentStyle = contentStyle.use();

    public constructor(props: RonpaContentBaseProps) {

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
                {this.props.children}
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
                {this.props.children}
            </div>
        </React.Fragment>);
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
