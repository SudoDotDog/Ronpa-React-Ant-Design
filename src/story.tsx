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

    readonly getAvatar?: (author: string) => string | React.ReactNode;
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
            actions={[
                <span onClick={console.log} key="reply-to">Reply to</span>,
            ]}
        >
            {story.bullets.map(this._renderBullets)}
        </Comment>);
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

    private _getAvatar(bullet: Bullet): string | React.ReactNode | undefined {

        if (this.props.getAvatar) {
            return this.props.getAvatar(bullet.by);
        }
        return undefined;
    }
}
