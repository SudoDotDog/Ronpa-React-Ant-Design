/**
 * @author WMXPY
 * @namespace Style
 * @description Bullet
 */

import { StyleManager, Styles } from "@sudoo/jss";
import { ronpaReactAntDesignStyleCollection } from "../common/style";

const bulletStyleBase: Styles = {

    activeReaction: {
        color: 'black !important',
    },
    commentCover: {
        '@global': {
            '.ant-comment-inner': {
                paddingTop: '6px',
                paddingBottom: '6px',
            },
            '.ant-comment-nested': {
                marginLeft: '24px',
            },
            '.ant-comment-content-author': {
                alignItems: 'center',
            },
        },
    },
    author: {
        fontSize: '14px',
    },
};

export const bulletStyle: StyleManager = ronpaReactAntDesignStyleCollection.hydrate('Bullet', bulletStyleBase);
