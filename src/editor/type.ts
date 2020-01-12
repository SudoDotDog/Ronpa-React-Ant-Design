/**
 * @author WMXPY
 * @namespace React_Ant_Design_Editor
 * @description Type
 */

import { ChangeType, RONPA_ACTION } from "ronpa";

export type RonpaEditorBaseProps = {

    readonly style?: React.CSSProperties;
    readonly className?: string;

    readonly username: string;

    readonly insiders?: string[];
    readonly story?: string;
    readonly reply?: string;

    readonly getAvatar?: (author: string) => string | React.ReactNode;
    readonly onAction?: (action: ChangeType<any, any>) => void;
};
