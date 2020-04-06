/**
 * @author WMXPY
 * @namespace React_Ant_Design_Stories
 * @description Action
 * @override Stroy
 */

import { action } from '@storybook/addon-actions';
import 'antd/dist/antd.css';
import * as React from 'react';
import { RonpaComments } from "../../src/index";
import { createMockRonpa } from "../mock/ronpa";

export default {
    title: 'Components/Action',
    component: RonpaComments,
};

export const Common = () => {

    return (<RonpaComments
        contentStyle={{
            fontStyle: 'italic',
        }}
        username="Jack"
        onAction={(event) => action(event.action)(event)}
        ronpa={createMockRonpa("Jack")}
        repliable
        reactions={[{
            name: 'like',
            text: '👍',
        }, {
            name: 'love',
            text: '😍',
        }]}
    />);
};
