/**
 * @author WMXPY
 * @namespace React_Ant_Design
 * @description Bullet
 * @override Mock
 */

import * as Chance from "chance";
import { Bullet } from "ronpa";

export const createMockBullet = (username?: string) => {

    const chance: Chance.Chance = new Chance('mock-bullet');

    const bullet: Bullet = Bullet.fromRecord({
        id: chance.string(),
        content: chance.paragraph(),
        at: new Date(),
        by: username,
        story: chance.string(),
    });

    return bullet;
};

export const createMockRobotAndGeneratedBullet = (username?: string) => {

    const chance: Chance.Chance = new Chance('mock-bullet');

    const bullet: Bullet = Bullet.fromRecord({
        id: chance.string(),
        content: chance.paragraph(),
        at: new Date(),
        by: username,
        story: chance.string(),
        isRobot: true,
        isGenerated: true,
    });

    return bullet;
};

export const createMockLongContentBullet = (username?: string) => {

    const chance: Chance.Chance = new Chance('mock-bullet');

    const bullet: Bullet = Bullet.fromRecord({
        id: chance.string(),
        content: `${chance.paragraph({
            sentences: 16,
        })}\n\n${chance.paragraph({
            sentences: 16,
        })}\n\t${chance.paragraph({
            sentences: 16,
        })}`,
        at: new Date(),
        by: username,
        story: chance.string(),
    });

    return bullet;
};
