/**
 * @author WMXPY
 * @namespace React_Ant_Design
 * @description Story
 */

import * as React from "react";
import { Bullet, ChangeType, RONPA_ACTION, Story } from "ronpa";
import { ReactionPropsConfig } from "../declare";
import { storyStyle } from "../style/story";
import { RonpaBullet } from "./bullet";

export type RonpaStoryProps = {

    readonly style?: React.CSSProperties;
    readonly className?: string;

    readonly username: string;
    readonly story: Story;

    readonly repliable?: boolean;
    readonly reactions?: ReactionPropsConfig[];

    readonly getAvatar?: (author: string) => string | React.ReactNode;
    readonly onChange?: <T extends RONPA_ACTION>(change: ChangeType<T>) => void;
};

export class RonpaStory extends React.Component<RonpaStoryProps> {

    private readonly _storyStyle = storyStyle.use();

    public constructor(props: RonpaStoryProps) {

        super(props);

        this._emitChange = this._emitChange.bind(this);
        this._renderBullets = this._renderBullets.bind(this);
    }

    public render() {

        const story: Story = this.props.story;
        const first: Bullet = this.props.story.assertThesisBullet();

        return (<RonpaBullet
            username={this.props.username}
            storyId={story.id}
            bullet={first}
            repliable={this.props.repliable}
            reactions={this.props.reactions}
            getAvatar={this.props.getAvatar}
            onChange={this._emitChange}
        >
            {story.bullets.map(this._renderBullets)}
        </RonpaBullet>);
    }

    private _renderBullets(bullet: Bullet) {

        return (<RonpaBullet
            key={bullet.id}
            username={this.props.username}
            storyId={this.props.story.id}
            bullet={bullet}
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
