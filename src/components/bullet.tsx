/**
 * @author WMXPY
 * @namespace React_Ant_Design
 * @description Bullet
 */

import { ApiOutlined, RobotOutlined } from "@ant-design/icons";
import { assertIfTrue, mergeClasses } from "@sudoo/jss";
import { Comment, Tag, Tooltip } from "antd";
import * as React from "react";
import { Bullet, ChangeType, draftAddReactionChange, draftRemoveReactionChange, RECORD_TYPE, RONPA_ACTION, Thesis } from "ronpa";
import { RonpaAttachmentContent } from "../content/attachment";
import { RonpaFileContent } from "../content/file";
import { RonpaTextContent } from "../content/text";
import { ReactionPropsConfig } from "../declare";
import { RonpaEditor } from "../editor/editor";
import { EditorActionFunction, EditorMode, RonpaEditorUploadResult } from "../editor/type";
import { bulletStyle } from "../style/bullet";
import { countReactionType, hasReactionType } from "../util";

export type RonpaBulletProps = {

    readonly style?: React.CSSProperties;
    readonly className?: string;

    readonly contentStyle?: React.CSSProperties;

    readonly username: string;
    readonly storyId: string;
    readonly bullet: Bullet<any>;

    readonly thesis?: Thesis;

    readonly insiders?: boolean;
    readonly repliable?: boolean;
    readonly contentLimit?: number;
    readonly reactions?: ReactionPropsConfig[];

    readonly getAvatar?: (author: string) => string | React.ReactNode;
    readonly getAbbreviation?: (author: string) => string | React.ReactNode;
    readonly uploadFile?: (file: File) => Promise<RonpaEditorUploadResult> | RonpaEditorUploadResult;
    readonly onAction?: <T extends RONPA_ACTION>(change: ChangeType<T>) => void;
    readonly editorMode?: EditorMode;
    readonly editorActions?: EditorActionFunction;
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
                this._bulletStyle.commentCover,
            )}
            style={this.props.style}
            key={bullet.id}
            content={this._renderContent()}
            avatar={this._getAvatar(bullet)}
            author={this._renderAuthor(bullet)}
            datetime={<span>{bullet.at.toLocaleString()}</span>}
            actions={this._renderActions(bullet)}
        >
            {this._renderEditor()}
            {this.props.children}
        </Comment>);
    }

    private _renderAuthor(bullet: Bullet<any>) {

        return (<span className={this._bulletStyle.author}>
            {this._renderRobotIcon(bullet)}
            {this._renderGeneratedIcon(bullet)}
            {this._renderAuthorName(bullet.by)}
        </span>)
    }

    private _renderAuthorName(author: string) {

        if (this.props.getAbbreviation) {

            const abbreviation: string | React.ReactNode = this.props.getAbbreviation(author);
            return (<Tooltip title={author}>
                <span>{abbreviation}</span>
            </Tooltip>);
        }

        return author;
    }

    private _renderRobotIcon(bullet: Bullet<any>) {

        if (!bullet.isRobot) {
            return null;
        }

        return (<Tooltip title="Robot">
            <Tag color="magenta">
                <RobotOutlined />
            </Tag>
        </Tooltip>);
    }

    private _renderGeneratedIcon(bullet: Bullet<any>) {

        if (!bullet.isGenerated) {
            return null;
        }

        return (<Tooltip title="Generated">
            <Tag color="orange">
                <ApiOutlined />
            </Tag>
        </Tooltip>);
    }

    private _renderContent() {

        switch (this.props.bullet.type) {
            case RECORD_TYPE.TEXT: {
                const bullet: Bullet<RECORD_TYPE.TEXT> = this.props.bullet;
                return (<RonpaTextContent
                    style={this.props.contentStyle}
                    content={bullet.content}
                    thesis={this.props.thesis}
                    insiders={this.props.insiders}
                    contentLimit={this.props.contentLimit}
                />);
            }
            case RECORD_TYPE.FILE: {
                const bullet: Bullet<RECORD_TYPE.FILE> = this.props.bullet;
                return (<RonpaFileContent
                    style={this.props.contentStyle}
                    content={bullet.content}
                    thesis={this.props.thesis}
                    insiders={this.props.insiders}
                    contentLimit={this.props.contentLimit}
                />);
            }
            case RECORD_TYPE.ATTACHMENT: {
                const bullet: Bullet<RECORD_TYPE.ATTACHMENT> = this.props.bullet;
                return (<RonpaAttachmentContent
                    style={this.props.contentStyle}
                    content={bullet.content}
                    thesis={this.props.thesis}
                    insiders={this.props.insiders}
                    contentLimit={this.props.contentLimit}
                />);
            }
        }

        return null;
    }

    private _renderEditor() {

        if (!this.props.repliable) {
            return null;
        }

        return (<RonpaEditor
            username={this.props.username}
            visible={this.state.replying}
            getAvatar={this.props.getAvatar}
            getAbbreviation={this.props.getAbbreviation}
            uploadFile={this.props.uploadFile}
            onAction={this._emitChange}

            story={this.props.bullet.story}
            reply={this.props.bullet.id}

            mode={this.props.editorMode}
            actions={this.props.editorActions}
        />);
    }

    private _emitChange<T extends RONPA_ACTION>(change: ChangeType<T>): void {

        if (this.props.onAction) {
            this.setState({
                replying: false,
            });
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
