/**
 * @author WMXPY
 * @namespace React_Ant_Design_Content
 * @description File Icon
 */

import { Icon } from "antd";
import * as React from "react";

export type FileIconProps = {

    readonly mimeType: string;
};

export const getIconName = (mimeType: string): string => {

    if (mimeType.startsWith('text/')) {
        return "file-text";
    } else if (mimeType.startsWith('image/')) {
        return "file-image";
    } else if (mimeType.startsWith('video/')) {
        return "file-exclamation";
    } else if (mimeType.startsWith('audio/')) {
        return "file-exclamation";
    }
    return "file-unknown";
};

export const FileIcon: React.FC<FileIconProps> = (props: FileIconProps) => {

    const iconName: string = getIconName(props.mimeType);

    return (<Icon
        type={iconName}
        theme="filled"
        style={{
            fontSize: '15px',
        }}
    />);
};
