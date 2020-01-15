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
    list: {
        marginTop: '8px !important',
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
    itemEach: {
        padding: '8px !important',
        paddingTop: '5px !important',
        paddingBottom: '5px !important',
    },
};

export const contentStyle: StyleManager = StyleManager.create(contentStyleBase, 'Content').setPrefix('Ronpa-React-Ant-Design-');
