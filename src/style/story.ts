/**
 * @author WMXPY
 * @namespace Style
 * @description Story
 */

import { JSSStyle, StyleManager } from "@sudoo/jss";

const storyStyleBase: JSSStyle = {

    activeReaction: {
        color: 'black !important',
    },
};

export const storyStyle: StyleManager = StyleManager.create(storyStyleBase, 'Story').setPrefix('Ronpa-React-Ant-Design-');
