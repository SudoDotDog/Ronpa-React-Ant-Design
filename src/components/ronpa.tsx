/**
 * @author WMXPY
 * @namespace React_Ant_Design
 * @description Ronpa
 */

import { mergeClasses } from "@sudoo/jss";
import * as React from "react";
import { ChangeType, Ronpa, RONPA_ACTION, Story } from "ronpa";
import { ReactionPropsConfig } from "../declare";
import { ronpaStyle } from "../style/ronpa";
import { RonpaStory } from "./story";

export type RonpaCommentsProps = {

    readonly style?: React.CSSProperties;
    readonly className?: string;

    readonly username: string;
    readonly ronpa: Ronpa;

    readonly repliable?: boolean;
    readonly reactions?: ReactionPropsConfig[];

    readonly getAvatar?: (author: string) => string | React.ReactNode;
    readonly onChange?: <T extends RONPA_ACTION>(change: ChangeType<T>) => void;
};

export class RonpaComments extends React.Component<RonpaCommentsProps> {

    private readonly _ronpaStyle = ronpaStyle.use();

    public constructor(props: RonpaCommentsProps) {

        super(props);

        this._emitChange = this._emitChange.bind(this);
        this._renderStories = this._renderStories.bind(this);
    }

    public render() {

        const stories: Story[] = this.props.ronpa.getThesisStories();

        return (<div
            className={mergeClasses(
                this.props.className,
            )}
            style={this.props.style}
        >
            {stories.map(this._renderStories)}
        </div>);
    }

    private _renderStories(story: Story) {

        return (<RonpaStory
            key={story.id}
            username={this.props.username}
            story={story}
            repliable={this.props.repliable}
            reactions={this.props.reactions}
            getAvatar={this.props.getAvatar}
            onChange={this._emitChange}
        />);
    }

    private _emitChange<T extends RONPA_ACTION>(change: ChangeType<T>): void {

        if (this.props.onChange) {
            this.props.onChange(change);
        }
        return;
    }
}
