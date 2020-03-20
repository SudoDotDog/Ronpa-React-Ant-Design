/**
 * @author WMXPY
 * @namespace React_Ant_Design_Stories
 * @description Components
 * @override Story
 */

import 'antd/dist/antd.css';
import * as React from 'react';
import { RonpaStory } from "../../src/index";
import { createMockStory } from "../mock/story";

export default {
    title: 'Components/Story',
    component: RonpaStory,
};

export const Simple = () => {

    return (<RonpaStory
        username="Jack"
        onAction={console.log}
        story={createMockStory()}
    />);
};

export const Repliable = () => {

    return (<RonpaStory
        getAvatar={(author) => `https://www.gravatar.com/avatar/${author}`}
        username="Jack"
        repliable
        onAction={console.log}
        story={createMockStory()}
    />);
};

export const RepliableAttachment = () => {

    return (<RonpaStory
        getAvatar={(author) => `https://www.gravatar.com/avatar/${author}`}
        uploadFile={() => ({
            path: 'https://google.com/robots.txt',
            uploadedAt: new Date(),
        })}
        editorMode={'attachment'}
        username="Jack"
        repliable
        onAction={console.log}
        story={createMockStory()}
    />);
};

export const Reactions = () => {

    return (<RonpaStory
        getAvatar={(author) => `https://www.gravatar.com/avatar/${author}`}
        username="Jack"
        onAction={console.log}
        reactions={[{
            name: 'like',
            text: '👍',
        }, {
            name: 'love',
            text: '😍',
        }]}
        story={createMockStory("Jack")}
    />);
};