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
    outer: {
        transition: '0.3s all',
        overflow: 'hidden',
    },
    restButton: {
        userSelect: 'none',
        cursor: 'pointer',
        color: 'blue',
        textDecoration: 'none',

        '&:hover': {
            textDecoration: 'underline',
        },
    },
};

export const contentStyle: StyleManager = StyleManager.create(contentStyleBase, 'Content').setPrefix('Ronpa-React-Ant-Design-');