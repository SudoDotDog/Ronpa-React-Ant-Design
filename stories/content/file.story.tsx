/**
 * @author WMXPY
 * @namespace React_Ant_Design_Stories
 * @description File
 * @override Story
 */

import 'antd/dist/antd.css';
import * as React from 'react';
import { RonpaFileContent } from "../../src/index";

export default {
    title: 'Content/File',
    component: RonpaFileContent,
};

export const Simple = () => {

    return (<RonpaFileContent
        content={[{
            id: "first",
            path: "https://google.com/robots.txt",
            originalName: "first-file.txt",
            mimeType: "text/plain",
            size: 340,
            lastModifyAt: new Date(),
            uploadedAt: new Date(),
        }, {
            id: "second",
            path: "https://google.com/robots.txt",
            originalName: "second-file.txt",
            mimeType: "text/plain",
            size: 600,
            lastModifyAt: new Date(),
            uploadedAt: new Date(),
        }]}
        thesis={{
            insiders: ["First Insider"]
        }}
        insiders
        contentLimit={5}
    />);
};
