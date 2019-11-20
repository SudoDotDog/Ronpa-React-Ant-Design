/**
 * @author WMXPY
 * @namespace React_Ant_Design
 * @description Story
 */

import { assertIfTrue, mergeClasses } from "@sudoo/jss";
import { Comment } from "antd";
import * as React from "react";
import { Bullet, ChangeType, draftAddReactionChange, draftRemoveReactionChange, RONPA_ACTION, Story } from "ronpa";
import { ReactionPropsConfig } from "./declare";
import { storyStyle } from "./style/story";
import { countReactionType, hasReactionType } from "./util";

export type RonpaStoryProps = {

    readonly style?: React.CSSProperties;
    readonly className?: string;

    readonly username: string;
    readonly story: Story;

    readonly reactions?: ReactionPropsConfig[];

    readonly getAvatar?: (author: string) => string | React.ReactNode;
    readonly onChange?: <T extends RONPA_ACTION>(change: ChangeType<T>) => void;
};

export class RonpaStory extends React.Component<RonpaStoryProps> {

    private readonly _storyStyle = storyStyle.use();

    public constructor(props: RonpaStoryProps) {

        super(props);

        this._renderBullets = this._renderBullets.bind(this);
    }

    public render() {

        const story: Story = this.props.story;
        const first: Bullet = story.assertThesisBullet();

        return (<Comment
            key={first.id}
            content={first.content}
            avatar={this._getAvatar(first)}
            author={first.by}
            datetime={<span>{first.at.toLocaleString()}</span>}
            actions={this._renderActions(first)}
        >
            {story.bullets.map(this._renderBullets)}
        </Comment>);
    }

    private _emitChange<T extends RONPA_ACTION>(change: ChangeType<T>): void {

        if (this.props.onChange) {
            this.props.onChange(change);
        }
        return;
    }

    private _renderBullets(bullet: Bullet) {

        return (<Comment
            key={bullet.id}
            content={bullet.content}
            avatar={this._getAvatar(bullet)}
            author={bullet.by}
            datetime={<span>{bullet.at.toLocaleString()}</span>}
        />);
    }

    private _renderActions(bullet: Bullet) {

        const replyTo = (<span onClick={console.log} key="reply-to">Reply to</span>);

        if (this.props.reactions) {

            const reactions = this.props.reactions.map((reaction: ReactionPropsConfig) => {

                const count: number = countReactionType(bullet, reaction);
                const active: boolean = hasReactionType(bullet, reaction, this.props.username);

                const clickFunction = active
                    ? () => this._emitChange(draftRemoveReactionChange({
                        reaction: reaction.name,
                        by: this.props.username,
                        bulletId: bullet.id,
                    }))
                    : () => this._emitChange(draftAddReactionChange({
                        reaction: reaction.name,
                        by: this.props.username,
                        bulletId: bullet.id,
                    }));
                return (<span
                    onClick={clickFunction}
                    className={mergeClasses(
                        assertIfTrue(active, this._storyStyle.activeReaction),
                    )}
                    key={`reaction-${reaction.name}`}
                >{reaction.text} {count}</span>);
            });


            return [replyTo].concat(reactions);
        }

        return [replyTo];
    }

    private _getAvatar(bullet: Bullet): string | React.ReactNode | undefined {

        if (this.props.getAvatar) {
            return this.props.getAvatar(bullet.by);
        }
        return undefined;
    }
}
