/**
 * @author WMXPY
 * @namespace React_Ant_Design
 * @description Ronpa
 * @override Mock
 */

import * as Chance from "chance";
import { Bullet, Reaction, RECORD_TYPE, Ronpa, Story } from "ronpa";

export const createMockRonpa = (username?: string): Ronpa => {

    const chance: Chance.Chance = new Chance('mock-ronpa');

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
        reactions: [...reactions],
        story: story.id,
    });

    const bullet2: Bullet<RECORD_TYPE.FILE> = Bullet.fromRecord<RECORD_TYPE.FILE>({
        type: RECORD_TYPE.FILE,
        id: chance.string(),
        content: [{
            id: "first",
            path: "https://google.com/robots.txt",
            originalName: "first-file.txt",
            mimeType: "text/plain",
            size: 16520,
            lastModifyAt: new Date(),
            uploadedAt: new Date(),
        }, {
            id: "second",
            path: "https://google.com/robots.txt",
            originalName: "second-file.mpeg",
            mimeType: "audio/mpeg",
            size: 85216632,
            lastModifyAt: new Date(),
            uploadedAt: new Date(),
        }],
        at: new Date(),
        by: chance.name(),
        story: story.id,
    });

    const thesis: Bullet = Bullet.fromRecord({
        id: chance.string(),
        content: chance.paragraph(),
        at: new Date(),
        by: chance.name(),
        reactions: [...reactions],
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
    const secondStory: Story = ronpa.createAndGetStory(username, chance.paragraph());

    const bullet3: Bullet<RECORD_TYPE.ATTACHMENT> = Bullet.fromRecord<RECORD_TYPE.ATTACHMENT>({
        type: RECORD_TYPE.ATTACHMENT,
        id: chance.string(),
        content: {
            text: chance.paragraph(),
            files: [{
                id: "first",
                path: "https://google.com/robots.txt",
                originalName: "first-file.ogg",
                mimeType: "video/ogg",
                size: 135662,
                lastModifyAt: new Date(),
                uploadedAt: new Date(),
            }, {
                id: "second",
                path: "https://google.com/robots.txt",
                originalName: "second-file.jpeg",
                mimeType: "image/jpeg",
                size: 5124820,
                lastModifyAt: new Date(),
                uploadedAt: new Date(),
            }],
        },
        at: new Date(),
        by: chance.name(),
        story: secondStory.id,
    });

    secondStory.addBullet(bullet3);

    return ronpa;
};
