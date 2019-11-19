/**
 * @author WMXPY
 * @namespace React_Ant_Design
 * @description Story
 * @override Story Mock
 */

import * as Chance from "chance";
import { Bullet, Story } from "ronpa";

export const createMockStory = () => {

    const chance: Chance.Chance = new Chance('story-mock-story');

    const story: Story = Story.create();

    const bullet1: Bullet = Bullet.fromRecord({
        id: chance.string(),
        content: chance.paragraph(),
        at: new Date(),
        by: chance.name(),
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
