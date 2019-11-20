/**
 * @author WMXPY
 * @namespace React_Ant_Design
 * @description Bullet
 */

import { assertIfTrue, mergeClasses } from "@sudoo/jss";
import { Comment } from "antd";
import * as React from "react";
import { Bullet, ChangeType, draftAddReactionChange, draftRemoveReactionChange, RONPA_ACTION } from "ronpa";
import { ReactionPropsConfig } from "../declare";
import { bulletStyle } from "../style/bullet";
import { countReactionType, hasReactionType } from "../util";

export type RonpaBulletProps = {

    readonly style?: React.CSSProperties;
    readonly className?: string;

    readonly username: string;
    readonly bullet: Bullet;

    readonly reactions?: ReactionPropsConfig[];

    readonly getAvatar?: (author: string) => string | React.ReactNode;
    readonly onChange?: <T extends RONPA_ACTION>(change: ChangeType<T>) => void;
};

export class RonpaBullet extends React.Component<RonpaBulletProps> {

    private readonly _bulletStyle = bulletStyle.use();

    public render() {

        const bullet: Bullet = this.props.bullet;

        return (<Comment
            key={bullet.id}
            content={bullet.content}
            avatar={this._getAvatar(bullet)}
            author={bullet.by}
            datetime={<span>{bullet.at.toLocaleString()}</span>}
            actions={this._renderActions(bullet)}
        >
            {this.props.children}
        </Comment>);
    }

    private _emitChange<T extends RONPA_ACTION>(change: ChangeType<T>): void {

        if (this.props.onChange) {
            this.props.onChange(change);
        }
        return;
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
                        assertIfTrue(active, this._bulletStyle.activeReaction),
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
