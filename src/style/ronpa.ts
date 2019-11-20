/**
 * @author WMXPY
 * @namespace Style
 * @description Ronpa
 */

import { JSSStyle, StyleManager } from "@sudoo/jss";

const ronpaStyleBase: JSSStyle = {
};

export const ronpaStyle: StyleManager = StyleManager.create(ronpaStyleBase, 'Ronpa').setPrefix('Ronpa-React-Ant-Design-');
