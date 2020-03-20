/**
 * @author WMXPY
 * @namespace React_Ant_Design_Stories
 * @description Content
 * @override Attachment
 */

import 'antd/dist/antd.css';
import * as React from 'react';
import { RonpaAttachmentContent } from "../../src/index";

export default {
    title: 'Content/Attachment',
    component: RonpaAttachmentContent,
};

export const Simple = () => {

    return (<RonpaAttachmentContent
        content={{
            text: "hello world",
            files: [{
                id: "first",
                path: "https://google.com/robots.txt",
                originalName: "first-file.txt",
                mimeType: "text/plain",
                size: 340,
                lastModifyAt: new Date(),
                uploadedAt: new Date(),
            }],
        }}
        thesis={{
            insiders: ["First Insider"]
        }}
        insiders
        contentLimit={5}
    />);
};
