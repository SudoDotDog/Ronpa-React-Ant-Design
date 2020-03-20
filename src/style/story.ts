/**
 * @author WMXPY
 * @namespace Style
 * @description Story
 */

import { StyleManager, Styles } from "@sudoo/jss";
import { ronpaReactAntDesignStyleCollection } from "../common/style";

const storyStyleBase: Styles = {
};

export const storyStyle: StyleManager = ronpaReactAntDesignStyleCollection.hydrate('Story', storyStyleBase);
