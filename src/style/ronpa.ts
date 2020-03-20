/**
 * @author WMXPY
 * @namespace Style
 * @description Ronpa
 */

import { StyleManager, Styles } from "@sudoo/jss";
import { ronpaReactAntDesignStyleCollection } from "../common/style";

const ronpaStyleBase: Styles = {
};

export const ronpaStyle: StyleManager = ronpaReactAntDesignStyleCollection.hydrate('Ronpa', ronpaStyleBase);
