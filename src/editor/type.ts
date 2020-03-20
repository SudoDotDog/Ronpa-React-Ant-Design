/**
 * @author WMXPY
 * @namespace React_Ant_Design_Editor
 * @description Type
 */

import { ChangeType } from "ronpa";

export type RonpaEditorUploadResult = {

    readonly path: string;

    readonly uploadedAt?: Date;
};

export type RonpaEditorBaseProps = {

    readonly style?: React.CSSProperties;
    readonly className?: string;

    readonly username: string;

    readonly insiders?: string[];
    readonly story?: string;
    readonly reply?: string;

    readonly getAvatar?: (author: string) => string | React.ReactNode;
    readonly getAbbreviation?: (author: string) => string | React.ReactNode;
    readonly uploadFile?: (file: File) => Promise<RonpaEditorUploadResult> | RonpaEditorUploadResult;
    readonly onAction?: (action: ChangeType<any, any>) => void;

    readonly actions?: EditorActionFunction;
};

export type EditorActionFunction = (onAction: () => void, shouldEmit: () => boolean) => React.ReactNode;
export type EditorMode = 'text' | 'file' | 'attachment' | 'dynamic';
