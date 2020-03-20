/**
 * @author WMXPY
 * @namespace React_Ant_Design_Stories
 * @description Example
 * @override Abbreviation
 */

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
        onAction={console.log}
        getAvatar={(author) => `https://www.gravatar.com/avatar/${author}`}
        getAbbreviation={(author) => `Mr/Ms. ${author}`}
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
