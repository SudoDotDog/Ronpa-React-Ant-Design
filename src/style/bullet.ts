/**
 * @author WMXPY
 * @namespace Style
 * @description Bullet
 */

import { JSSStyle, StyleManager } from "@sudoo/jss";

const bulletStyleBase: JSSStyle = {

    activeReaction: {
        color: 'black !important',
    },
    username: {
        color: 'blue',
    },
};

export const bulletStyle: StyleManager = StyleManager.create(bulletStyleBase, 'Bullet').setPrefix('Ronpa-React-Ant-Design-');
