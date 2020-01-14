/**
 * @author WMXPY
 * @namespace React_Ant_Design
 * @description Util
 * @override Mock
 */

import * as Chance from "chance";
import { RonpaEditorUploadResult } from "../../src/editor/type";

export const mockUploadFunction = async (file: File): Promise<RonpaEditorUploadResult> => {

    const chance: Chance.Chance = new Chance();

    await new Promise((resolve: () => void) => setTimeout(resolve, chance.natural({
        max: 3000,
    })));

    return {
        path: 'https://google.com/robots.txt',
        uploadedAt: new Date(),
    } as RonpaEditorUploadResult;
};
