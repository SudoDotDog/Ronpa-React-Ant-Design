/**
 * @author WMXPY
 * @namespace React_Ant_Design
 * @description Bullet
 */

import { assertIfTrue, mergeClasses } from "@sudoo/jss";
import { Comment } from "antd";
import * as React from "react";
import { Bullet, ChangeType, draftAddReactionChange, draftRemoveReactionChange, RONPA_ACTION, Thesis } from "ronpa";
import { ReactionPropsConfig } from "../declare";
import { RonpaEditor } from "../editor/editor";
import { EditorMode, RonpaEditorUploadResult } from "../editor/type";
import { bulletStyle } from "../style/bullet";
import { countReactionType, hasReactionType } from "../util";
import { RonpaContent } from "./content";

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
    readonly contentLimit?: number;
    readonly reactions?: ReactionPropsConfig[];

    readonly getAvatar?: (author: string) => string | React.ReactNode;
    readonly uploadFile?: (file: File) => Promise<RonpaEditorUploadResult>;
    readonly onAction?: <T extends RONPA_ACTION>(change: ChangeType<T>) => void;
    readonly editorMode?: EditorMode;
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
            contentLimit={this.props.contentLimit}
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
            uploadFile={this.props.uploadFile}
            onAction={this._emitChange}

            story={this.props.bullet.story}
            reply={this.props.bullet.id}

            mode={this.props.editorMode}
        />);
    }

    private _emitChange<T extends RONPA_ACTION>(change: ChangeType<T>): void {

        if (this.props.onAction) {
            this.props.onAction(change);
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
                        assertIfTrue(
                            active,
                            this._bulletStyle.activeReaction,
                        ),
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
