/**
 * @author WMXPY
 * @namespace React_Ant_Design
 * @description Story
 * @override Mock
 */

import * as Chance from "chance";
import { Bullet, Reaction, Story } from "ronpa";

export const createMockStory = (username?: string) => {

    const chance: Chance.Chance = new Chance('mock-story');

    const story: Story = Story.create();
    const reactions: Reaction[] = username ? [
        {
            by: username,
            type: 'like',
            at: new Date(),
        },
    ] : [];

    const bullet1: Bullet = Bullet.fromRecord({
        id: chance.string(),
        content: chance.paragraph(),
        at: new Date(),
        by: chance.name(),
        reactions,
        story: story.id,
    });

    const bullet2: Bullet = Bullet.fromRecord({
        id: chance.string(),
        content: chance.paragraph(),
        at: new Date(),
        by: chance.name(),
        story: story.id,
    });

    const thesis: Bullet = Bullet.fromRecord({
        id: chance.string(),
        content: chance.paragraph(),
        at: new Date(),
        by: chance.name(),
        reactions,
        story: story.id,
    });

    story.addBullet(bullet1);
    story.addBullet(bullet2);
    story.setThesis(thesis, {
        insiders: [
            chance.name(),
            chance.name(),
        ],
    });

    return story;
};
