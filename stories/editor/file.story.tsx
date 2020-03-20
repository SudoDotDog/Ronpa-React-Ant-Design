/**
 * @author WMXPY
 * @namespace React_Ant_Design_Stories
 * @description Editor
 * @override File
 */

import { Button } from 'antd';
import 'antd/dist/antd.css';
import * as React from 'react';
import { RonpaFileEditor } from "../../src/index";

export default {
    title: 'Editor/File',
    component: RonpaFileEditor,
};

export const Thesis = () => {

    return (<RonpaFileEditor
        username="Jack"
        uploadFile={() => ({
            path: 'https://google.com/robots.txt',
            uploadedAt: new Date(),
        })}
        onAction={console.log}
        insiders={['a', 'b']}
    />);
};

export const Reply = () => {

    return (<RonpaFileEditor
        username="Jack"
        uploadFile={() => ({
            path: 'https://google.com/robots.txt',
            uploadedAt: new Date(),
        })}
        onAction={console.log}
        story="story"
        reply="reply"
    />);
};

export const CustomizedActions = () => {

    return (<RonpaFileEditor
        username="Jack"
        uploadFile={() => ({
            path: 'https://google.com/robots.txt',
            uploadedAt: new Date(),
        })}
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
