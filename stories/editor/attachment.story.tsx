/**
 * @author WMXPY
 * @namespace React_Ant_Design_Stories
 * @description Editor
 * @override Attachment
 */

import { Button } from 'antd';
import 'antd/dist/antd.css';
import * as React from 'react';
import { RonpaAttachmentEditor } from "../../src/index";
import { mockUploadFunction } from '../mock/util';

export default {
    title: 'Editor/Attachment',
    component: RonpaAttachmentEditor,
};

export const Thesis = () => {

    return (<RonpaAttachmentEditor
        username="Jack"
        uploadFile={mockUploadFunction}
        onAction={console.log}
        insiders={['a', 'b']}
    />);
};

export const Reply = () => {

    return (<RonpaAttachmentEditor
        username="Jack"
        uploadFile={mockUploadFunction}
        onAction={console.log}
        story="story"
        reply="reply"
    />);
};

export const CustomizedActions = () => {

    return (<RonpaAttachmentEditor
        username="Jack"
        uploadFile={mockUploadFunction}
        onAction={console.log}
        actions={(onAction, shouldEmit) => (
            <Button.Group style={{ marginTop: '5px' }}>
                <Button onClick={onAction} disabled={!shouldEmit()}>Customized Action 1</Button>
                <Button onClick={onAction} type="primary">Customized Action 2 (Primary)</Button>
                <Button onClick={onAction} disabled>Customized Action 3 (Disabled)</Button>
            </Button.Group>
        )}
    />);
};
