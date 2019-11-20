/**
 * @author WMXPY
 * @namespace React_Ant_Design
 * @description Ronpa
 * @override Story Mock
 */

import * as Chance from "chance";
import { Bullet, Reaction, Ronpa, Story } from "ronpa";

export const createMockRonpa = (username?: string): Ronpa => {

    const chance: Chance.Chance = new Chance('story-mock-ronpa');

    const ronpa: Ronpa = Ronpa.create();

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

    ronpa.addStory(story);
    ronpa.createAndGetStory(username, chance.paragraph());

    return ronpa;
};
