/**
 * @author WMXPY
 * @namespace React_Ant_Design_Stories
 * @description Components
 * @override Bullet
 */

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
        onAction={console.log}
    />);
};

export const LongContent = () => {

    return (<RonpaBullet
        username="Jack"
        storyId="test"
        bullet={createMockLongContentBullet('Jack')}
        contentLimit={512}
        onAction={console.log}
    />);
};

export const RobotAndGenerated = () => {

    return (<RonpaBullet
        username="Jack"
        storyId="test"
        bullet={createMockRobotAndGeneratedBullet('Robot')}
        onAction={console.log}
    />);
};
