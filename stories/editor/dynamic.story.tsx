/**
 * @author WMXPY
 * @namespace React_Ant_Design_Stories
 * @description Dynamic
 * @override Story
 */

import { action } from '@storybook/addon-actions';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import * as React from 'react';
import { RonpaDynamicEditor } from "../../src/index";
import { mockUploadFunction } from "../mock/util";

export default {
    title: 'Editor/Dynamic',
    component: RonpaDynamicEditor,
};

export const Thesis = () => {

    return (<RonpaDynamicEditor
        username="Jack"
        uploadFile={mockUploadFunction}
        onAction={(event) => action(event.action)(event)}
        insiders={['a', 'b']}
    />);
};

export const Reply = () => {

    return (<RonpaDynamicEditor
        username="Jack"
        uploadFile={mockUploadFunction}
        onAction={(event) => action(event.action)(event)}
        story="story"
        reply="reply"
    />);
};

export const CustomizedActions = () => {

    return (<RonpaDynamicEditor
        username="Jack"
        uploadFile={mockUploadFunction}
        onAction={(event) => action(event.action)(event)}
        actions={(onAction, shouldEmit) => (
            <Button.Group style={{ marginTop: '5px' }}>
                <Button onClick={onAction} disabled={!shouldEmit()}>Customized Action 1</Button>
                <Button onClick={onAction} type="primary">Customized Action 2 (Primary)</Button>
                <Button onClick={onAction} disabled>Customized Action 3 (Disabled)</Button>
            </Button.Group>
        )}
    />);
};
