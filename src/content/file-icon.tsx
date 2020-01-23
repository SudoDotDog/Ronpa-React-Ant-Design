/**
 * @author WMXPY
 * @namespace React_Ant_Design_Content
 * @description File Icon
 */

import { Icon } from "antd";
import * as React from "react";

export type FileIconProps = {

    readonly mimeType: string;
    readonly large?: boolean;
};

export class FileIcon extends React.PureComponent<FileIconProps> {

    public render() {

        const iconName: string = this._getIconName(this.props.mimeType);
        return this.props.large ? this._renderLarge(iconName) : this._renderRegular(iconName);
    }

    private _renderRegular(iconName: string) {

        return (<Icon type={iconName} />);
    }

    private _renderLarge(iconName: string) {

        return (<Icon
            type={iconName}
            theme="filled"
            style={{
                fontSize: '15px',
            }}
        />);
    }

    private _getIconName(mimeType: string): string {

        /* cSpell:disable */
        if (mimeType.startsWith('text/')) {
            return "file-text";
        } else if (mimeType.startsWith('image/')) {
            return "file-image";
        } else if (mimeType.startsWith('video/')) {
            return "file-exclamation";
        } else if (mimeType.startsWith('audio/')) {
            return "file-exclamation";
        } else if (mimeType === 'application/pdf') {
            return "file-pdf";
        } else if (mimeType.includes('word') || mimeType.includes('officedocument.wordprocessingml')) {
            return "file-word";
        } else if (mimeType.includes('excel') || mimeType.includes('officedocument.spreadsheetml')) {
            return "file-excel";
        } else if (mimeType.includes('powerpoint') || mimeType.includes('officedocument.presentationml')) {
            return "file-ppt";
        } else if (mimeType.includes('zip')) {
            return "file-zip";
        }
        return "file-unknown";
        /* cSpell:enable */
    }
}
