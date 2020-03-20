/**
 * @author WMXPY
 * @namespace React_Ant_Design_Stories
 * @description Example
 * @override Attachment
 */

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
        onAction={console.log}
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
