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
        isRobot: true,
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
        isRobot: true,
        isGenerated: true,
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
    const secondStory: Story = ronpa.createAndGetStory(username ?? '', chance.paragraph());

    /* cSpell:disable */
    const bullet3: Bullet<RECORD_TYPE.ATTACHMENT> = Bullet.fromRecord<RECORD_TYPE.ATTACHMENT>({
        type: RECORD_TYPE.ATTACHMENT,
        id: chance.string(),
        content: {
            text: chance.paragraph(),
            files: [{
                id: "first",
                path: "https://google.com/robots.txt",
                originalName: "a-ppt-file.pptx",
                mimeType: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                size: 135662,
                lastModifyAt: new Date(),
                uploadedAt: new Date(),
            }, {
                id: "second",
                path: "https://google.com/robots.txt",
                originalName: "a-word-file.docx",
                mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                size: 5124820,
                lastModifyAt: new Date(),
                uploadedAt: new Date(),
            }, {
                id: "third",
                path: "https://google.com/robots.txt",
                originalName: "a-excel-file.xlsx",
                mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                size: 120584,
                lastModifyAt: new Date(),
                uploadedAt: new Date(),
            }, {
                id: "fourth",
                path: "https://google.com/robots.txt",
                originalName: "a-zip-file.zip",
                mimeType: "application/zip",
                size: 1729624,
                lastModifyAt: new Date(),
                uploadedAt: new Date(),
            }, {
                id: "fifth",
                path: "https://google.com/robots.txt",
                originalName: "a-pdf-file.pdf",
                mimeType: "application/pdf",
                size: 521003,
                lastModifyAt: new Date(),
                uploadedAt: new Date(),
            }],
        },
        at: new Date(),
        by: chance.name(),
        isGenerated: true,
        story: secondStory.id,
    });
    /* cSpell:enable */

    secondStory.addBullet(bullet3);

    return ronpa;
};
