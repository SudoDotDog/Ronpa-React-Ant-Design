/**
 * @author WMXPY
 * @namespace React_Ant_Design_Stories
 * @description Abbreviation
 * @override Story
 */

import { action } from '@storybook/addon-actions';
import 'antd/dist/antd.css';
import * as React from 'react';
import { RonpaComments } from "../../src/index";
import { createMockRonpa } from "../mock/ronpa";

export default {
    title: 'Example/Abbreviation',
    component: RonpaComments,
};

export const CommonUsage = () => {

    return (<RonpaComments
        contentStyle={{
            fontStyle: 'italic',
        }}
        contentLimit={100}
        username="Jack"
        onAction={(event) => action(event.action)(event)}
        getAvatar={(author: string) => `https://www.gravatar.com/avatar/${author}`}
        getAbbreviation={(author: string) => `Mr/Ms. ${author}`}
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
