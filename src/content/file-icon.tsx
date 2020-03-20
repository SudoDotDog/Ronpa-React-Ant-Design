/**
 * @author WMXPY
 * @namespace React_Ant_Design_Content
 * @description File Icon
 */

import * as React from "react";
import { FileTextFilled, FileImageFilled, FileExcelFilled, FileExclamationFilled, FilePdfFilled, FileWordFilled, FilePptFilled, FileZipFilled, FileUnknownFilled } from "@ant-design/icons";
import { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon";

export type FileIconProps = {

    readonly mimeType: string;
    readonly large?: boolean;
};

export class FileIcon extends React.PureComponent<FileIconProps> {

    public render() {

        const IconComponent: React.ComponentType<AntdIconProps> = this._getIconComponent(this.props.mimeType);
        return this.props.large
            ? (<IconComponent style={{ fontSize: '15px' }} />)
            : (<IconComponent />);
    }

    private _getIconComponent(mimeType: string): React.ComponentType<AntdIconProps> {

        /* cSpell:disable */
        if (mimeType.startsWith('text/')) {
            return FileTextFilled;
        } else if (mimeType.startsWith('image/')) {
            return FileImageFilled;
        } else if (mimeType.startsWith('video/')) {
            return FileExcelFilled;
        } else if (mimeType.startsWith('audio/')) {
            return FileExclamationFilled;
        } else if (mimeType === 'application/pdf') {
            return FilePdfFilled;
        } else if (mimeType.includes('word') || mimeType.includes('officedocument.wordprocessingml')) {
            return FileWordFilled;
        } else if (mimeType.includes('excel') || mimeType.includes('officedocument.spreadsheetml')) {
            return FileExcelFilled;
        } else if (mimeType.includes('powerpoint') || mimeType.includes('officedocument.presentationml')) {
            return FilePptFilled;
        } else if (mimeType.includes('zip')) {
            return FileZipFilled;
        }
        return FileUnknownFilled;
        /* cSpell:enable */
    }
}
