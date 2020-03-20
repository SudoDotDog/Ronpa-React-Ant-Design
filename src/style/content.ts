/**
 * @author WMXPY
 * @namespace Style
 * @description Content
 */

import { StyleManager, Styles } from "@sudoo/jss";
import { ronpaReactAntDesignStyleCollection } from "../common/style";

const contentStyleBase: Styles = {

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

export const contentStyle: StyleManager = ronpaReactAntDesignStyleCollection.hydrate('Content', contentStyleBase);
