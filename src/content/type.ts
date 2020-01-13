/**
 * @author WMXPY
 * @namespace React_Ant_Design_Content
 * @description Type
 */

import { Thesis } from "ronpa";

export type RonpaContentBaseProps = {

    readonly style?: React.CSSProperties;
    readonly className?: string;

    readonly thesis?: Thesis;

    readonly insiders?: boolean;
    readonly contentLimit?: number;
};
