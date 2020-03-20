/**
 * @author WMXPY
 * @namespace React_Ant_Design_Stories
 * @description Content
 * @override Text
 */

import 'antd/dist/antd.css';
import * as React from 'react';
import { RonpaTextContent } from "../../src/index";

export default {
    title: 'Content/Text',
    component: RonpaTextContent,
};

export const Simple = () => {

    return (<RonpaTextContent
        content="Content"
        thesis={{
            insiders: ["First Insider"]
        }}
        insiders
        contentLimit={5}
    />);
};
