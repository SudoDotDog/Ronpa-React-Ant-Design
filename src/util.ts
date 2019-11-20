/**
 * @author WMXPY
 * @namespace React_Ant_Design
 * @description Util
 */

import { Bullet, Reaction } from "ronpa";
import { ReactionPropsConfig } from "./declare";

export const countReactionType = (bullet: Bullet, reaction: ReactionPropsConfig): number => {

    const count: number = bullet.reactions.filter((each: Reaction) => {
        return each.type === reaction.name;
    }).length;

    return count;
};

export const hasReactionType = (bullet: Bullet, reaction: ReactionPropsConfig, from?: string): boolean => {

    if (!from) {
        return false;
    }

    for (const each of bullet.reactions) {
        if (each.type === reaction.name && each.by === from) {
            return true;
        }
    }
    return false;
};
