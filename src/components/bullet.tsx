/**
 * @author WMXPY
 * @namespace React_Ant_Design
 * @description Bullet
 */

import { assertIfTrue, mergeClasses } from "@sudoo/jss";
import { Comment } from "antd";
import * as React from "react";
import { Bullet, ChangeType, draftAddReactionChange, draftAddReplyChange, draftRemoveReactionChange, RECORD_TYPE, RONPA_ACTION, Thesis } from "ronpa";
import { ReactionPropsConfig } from "../declare";
import { bulletStyle } from "../style/bullet";
import { countReactionType, hasReactionType } from "../util";
import { RonpaContent } from "./content";
import { RonpaEditor } from "./editor";

export type RonpaBulletProps = {

    readonly style?: React.CSSProperties;
    readonly className?: string;

    readonly contentStyle?: React.CSSProperties;

    readonly username: string;
    readonly storyId: string;
    readonly bullet: Bullet;

    readonly thesis?: Thesis;

    readonly insiders?: boolean;
    readonly repliable?: boolean;
    readonly reactions?: ReactionPropsConfig[];

    readonly getAvatar?: (author: string) => string | React.ReactNode;
    readonly onChange?: <T extends RONPA_ACTION>(change: ChangeType<T>) => void;
};

export type RonpaBulletStates = {

    replying: boolean;
};

export class RonpaBullet extends React.Component<RonpaBulletProps, RonpaBulletStates> {

    public readonly state: RonpaBulletStates = {

        replying: false,
    };

    private readonly _bulletStyle = bulletStyle.use();

    public constructor(props: RonpaBulletProps) {

        super(props);

        this._emitChange = this._emitChange.bind(this);
    }

    public render() {

        const bullet: Bullet = this.props.bullet;

        return (<Comment
            className={mergeClasses(
                this.props.className,
            )}
            style={this.props.style}
            key={bullet.id}
            content={this._renderContent()}
            avatar={this._getAvatar(bullet)}
            author={bullet.by}
            datetime={<span>{bullet.at.toLocaleString()}</span>}
            actions={this._renderActions(bullet)}
        >
            {this._renderEditor()}
            {this.props.children}
        </Comment>);
    }

    private _renderContent() {

        return (<RonpaContent
            style={this.props.contentStyle}
            content={this.props.bullet.content}
            thesis={this.props.thesis}
            insiders={this.props.insiders}
        />);
    }

    private _renderEditor() {

        if (!this.props.repliable) {
            return null;
        }

        return (<RonpaEditor

            username={this.props.username}
            visible={this.state.replying}
            getAvatar={this.props.getAvatar}
            onSubmit={(content: string) => this._emitChange(draftAddReplyChange({
                by: this.props.username,
                type: RECORD_TYPE.TEXT,
                story: this.props.storyId,
                reply: this.props.bullet.id,
                content,
            }))}
        />);
    }

    private _emitChange<T extends RONPA_ACTION>(change: ChangeType<T>): void {

        if (this.props.onChange) {
            this.props.onChange(change);
        }
        return;
    }

    private _renderActions(bullet: Bullet) {

        const actions: React.ReactNode[] = [];

        if (this.props.reactions) {

            const reactions: React.ReactNode[] = this.props.reactions.map((reaction: ReactionPropsConfig) => {

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

            actions.push(...reactions);
        }

        if (this.props.repliable) {

            const replyTo: React.ReactNode = (<span
                onClick={() => this.setState({ replying: !this.state.replying })}
                key="reply"
            >{this.state.replying ? 'Cancel' : 'Reply'}</span>);
            return [replyTo].concat(actions);
        }

        return actions;
    }

    private _getAvatar(bullet: Bullet): string | React.ReactNode | undefined {

        if (this.props.getAvatar) {
            return this.props.getAvatar(bullet.by);
        }
        return undefined;
    }
}
