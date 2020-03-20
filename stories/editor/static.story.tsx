/**
 * @author WMXPY
 * @namespace React_Ant_Design_Stories
 * @description Editor
 * @override Static
 */

import { action } from '@storybook/addon-actions';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import * as React from 'react';
import { RonpaStaticEditor } from "../../src/index";

export default {
    title: 'Editor/Static',
    component: RonpaStaticEditor,
};

export const Thesis = () => {

    return (<RonpaStaticEditor
        username="Jack"
        onAction={(event) => action(event.action)(event)}
        insiders={['a', 'b']}
    />);
};

export const Reply = () => {

    return (<RonpaStaticEditor
        username="Jack"
        story="story"
        reply="reply"
        onAction={(event) => action(event.action)(event)}
    />);
};


export const CustomizedActions = () => {

    return (<RonpaStaticEditor
        username="Jack"
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
