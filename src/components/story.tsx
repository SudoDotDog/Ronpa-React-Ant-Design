/**
 * @author WMXPY
 * @namespace React_Ant_Design
 * @description Story
 */

import { mergeClasses } from "@sudoo/jss";
import * as React from "react";
import { Bullet, ChangeType, RONPA_ACTION, Story } from "ronpa";
import { ReactionPropsConfig } from "../declare";
import { EditorActionFunction, EditorMode, RonpaEditorUploadResult } from "../editor/type";
import { RonpaBullet } from "./bullet";

export type RonpaStoryProps = {

    readonly style?: React.CSSProperties;
    readonly className?: string;

    readonly contentStyle?: React.CSSProperties;

    readonly username: string;
    readonly story: Story;

    readonly insiders?: boolean;
    readonly repliable?: boolean;
    readonly contentLimit?: number;
    readonly reactions?: ReactionPropsConfig[];

    readonly getAvatar?: (author: string) => string | React.ReactNode;
    readonly uploadFile?: (file: File) => Promise<RonpaEditorUploadResult> | RonpaEditorUploadResult;
    readonly onAction?: <T extends RONPA_ACTION>(change: ChangeType<T>) => void;
    readonly editorMode?: EditorMode;
    readonly editorActions?: EditorActionFunction;
};

export class RonpaStory extends React.Component<RonpaStoryProps> {

    public constructor(props: RonpaStoryProps) {

        super(props);

        this._emitChange = this._emitChange.bind(this);
        this._renderBullets = this._renderBullets.bind(this);
    }

    public render() {

        const story: Story = this.props.story;
        const first: Bullet = this.props.story.assertThesisBullet();

        return (<RonpaBullet

            className={mergeClasses(
                this.props.className,
            )}
            style={this.props.style}

            contentStyle={this.props.contentStyle}
            username={this.props.username}
            storyId={story.id}
            bullet={first}
            thesis={story.assertThesis()}

            insiders={this.props.insiders}
            repliable={this.props.repliable}
            contentLimit={this.props.contentLimit}
            reactions={this.props.reactions}

            getAvatar={this.props.getAvatar}
            uploadFile={this.props.uploadFile}
            onAction={this._emitChange}
            editorMode={this.props.editorMode}
            editorActions={this.props.editorActions}
        >
            {story.bullets.map(this._renderBullets)}
        </RonpaBullet>);
    }

    private _renderBullets(bullet: Bullet) {

        return (<RonpaBullet

            key={bullet.id}

            username={this.props.username}
            contentStyle={this.props.contentStyle}
            storyId={this.props.story.id}
            bullet={bullet}

            insiders={this.props.insiders}
            repliable={this.props.repliable}
            contentLimit={this.props.contentLimit}
            reactions={this.props.reactions}

            getAvatar={this.props.getAvatar}
            uploadFile={this.props.uploadFile}
            onAction={this._emitChange}
            editorMode={this.props.editorMode}
            editorActions={this.props.editorActions}
        />);
    }

    private _emitChange<T extends RONPA_ACTION>(change: ChangeType<T>): void {

        if (this.props.onAction) {
            this.props.onAction(change);
        }
        return;
    }
}
