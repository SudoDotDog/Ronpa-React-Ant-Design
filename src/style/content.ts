/**
 * @author WMXPY
 * @namespace Style
 * @description Content
 */

import { JSSStyle, StyleManager } from "@sudoo/jss";

const contentStyleBase: JSSStyle = {

    content: {
        whiteSpace: 'pre-wrap',
    },
    username: {
        color: 'blue',
    },
};

export const contentStyle: StyleManager = StyleManager.create(contentStyleBase, 'Content').setPrefix('Ronpa-React-Ant-Design-');
