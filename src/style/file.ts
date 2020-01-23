/**
 * @author WMXPY
 * @namespace Style
 * @description File
 */

import { JSSStyle, StyleManager } from "@sudoo/jss";

const fileStyleBase: JSSStyle = {
};

export const fileStyle: StyleManager = StyleManager.create(fileStyleBase, 'File').setPrefix('Ronpa-React-Ant-Design-');
