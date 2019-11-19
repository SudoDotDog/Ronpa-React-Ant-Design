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

    const bullet: Bullet = Bullet.fromRecord({
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

    story.addBullet(bullet);
    story.setThesis(thesis, {
        insiders: [
            chance.name(),
            chance.name(),
        ],
    });

    return story;
};
