/**
 * @author WMXPY
 * @namespace React_Ant_Design_Stories
 * @description Attachment
 * @override Story
 */

import { action } from '@storybook/addon-actions';
import 'antd/dist/antd.css';
import * as React from 'react';
import { RonpaComments } from "../../src/index";
import { createMockRonpa } from "../mock/ronpa";

export default {
    title: 'Example/Attachment',
    component: RonpaComments,
};

export const AttachmentEnabledUsage = () => {

    return (<RonpaComments
        contentStyle={{
            fontStyle: 'italic',
        }}
        contentLimit={100}
        username="Jack"
        uploadFile={() => ({
            path: 'https://google.com/robots.txt',
            uploadedAt: new Date(),
        })}
        editorMode={'attachment'}
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
