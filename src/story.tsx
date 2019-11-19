/**
 * @author WMXPY
 * @namespace React_Ant_Design
 * @description Story
 */

import { Comment } from "antd";
import * as React from "react";
import { Bullet, Story } from "ronpa";
import { storyStyle } from "./style/story";

export type RonpaStoryProps = {

    readonly style?: React.CSSProperties;
    readonly className?: string;

    readonly story: Story;
};

export class RonpaStory extends React.Component<RonpaStoryProps> {

    private readonly _storyStyle = storyStyle.use();

    public constructor(props: RonpaStoryProps) {

        super(props);
    }

    public render() {

        console.log(this.props);

        const first: Bullet = this.props.story.assertThesisBullet();

        return (<div>
            <Comment
                key={this.props.story.id}
                content={first.content}
                author={first.by}
                datetime={<span>{first.at.toLocaleString()}</span>}
            >

            </Comment>
        </div>);
    }
}
