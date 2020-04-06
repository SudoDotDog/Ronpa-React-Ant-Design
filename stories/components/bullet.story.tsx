/**
 * @author WMXPY
 * @namespace React_Ant_Design_Stories
 * @description Bullet
 * @override Story
 */

import { action } from '@storybook/addon-actions';
import 'antd/dist/antd.css';
import * as React from 'react';
import { RonpaBullet } from "../../src/index";
import { createMockBullet, createMockLongContentBullet, createMockRobotAndGeneratedBullet } from "../mock/bullet";

export default {
    title: 'Components/Bullet',
    component: RonpaBullet,
};

export const Simple = () => {

    return (<RonpaBullet
        username="Jack"
        storyId="test"
        bullet={createMockBullet('Someone')}
        onAction={(event) => action(event.action)(event)}
    />);
};

export const Abbreviation = () => {

    return (<RonpaBullet
        username="Jack"
        storyId="test"
        bullet={createMockLongContentBullet('Jack')}
        contentLimit={512}
        getAbbreviation={(author: string) => author.substring(0, 1).toUpperCase()}
        onAction={(event) => action(event.action)(event)}
    />);
};

export const LongContent = () => {

    return (<RonpaBullet
        username="Jack"
        storyId="test"
        bullet={createMockLongContentBullet('Jack')}
        contentLimit={512}
        onAction={(event) => action(event.action)(event)}
    />);
};

export const RobotAndGenerated = () => {

    return (<RonpaBullet
        username="Jack"
        storyId="test"
        bullet={createMockRobotAndGeneratedBullet('Robot')}
        onAction={(event) => action(event.action)(event)}
    />);
};
