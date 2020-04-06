/**
 * @author WMXPY
 * @namespace React_Ant_Design_Stories
 * @description Common
 * @override Stroy
 */

import { action } from '@storybook/addon-actions';
import 'antd/dist/antd.css';
import * as React from 'react';
import { RonpaComments } from "../../src/index";
import { createMockRonpa } from "../mock/ronpa";

export default {
    title: 'Example/Common',
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
