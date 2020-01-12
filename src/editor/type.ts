/**
 * @author WMXPY
 * @namespace React_Ant_Design_Editor
 * @description Type
 */

export type RonpaEditorBaseProps = {

    readonly style?: React.CSSProperties;
    readonly className?: string;

    readonly username: string;

    readonly getAvatar?: (author: string) => string | React.ReactNode;
    readonly onSubmit?: (content: string) => void;
};
