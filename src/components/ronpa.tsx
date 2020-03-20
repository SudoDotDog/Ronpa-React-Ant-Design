/**
 * @author WMXPY
 * @namespace React_Ant_Design
 * @description Ronpa
 */

import { mergeClasses } from "@sudoo/jss";
import * as React from "react";
import { ChangeType, Ronpa, RONPA_ACTION, Story } from "ronpa";
import { ReactionPropsConfig } from "../declare";
import { EditorActionFunction, EditorMode, RonpaEditorUploadResult } from "../editor/type";
import { RonpaStory } from "./story";

export type RonpaCommentsProps = {

    readonly style?: React.CSSProperties;
    readonly className?: string;

    readonly contentStyle?: React.CSSProperties;

    readonly username: string;
    readonly ronpa: Ronpa;

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

export class RonpaComments extends React.Component<RonpaCommentsProps> {

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
            contentStyle={this.props.contentStyle}
            username={this.props.username}
            story={story}

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
