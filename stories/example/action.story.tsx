/**
 * @author WMXPY
 * @namespace React_Ant_Design_Stories
 * @description Action
 * @override Stroy
 */

import { action } from '@storybook/addon-actions';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import * as React from 'react';
import { RonpaComments } from "../../src/index";
import { createMockRonpa } from "../mock/ronpa";

export default {
    title: 'Example/Action',
    component: RonpaComments,
};

export const CustomizedActionsUsage = () => {

    return (<RonpaComments
        contentStyle={{
            fontStyle: 'italic',
        }}
        contentLimit={100}
        username="Jack"
        uploadFile={() => ({
            path: 'https://google.com/robots.txt',
            uploadedAt: new Date(),
        })}
        onAction={(event) => action(event.action)(event)}
        ronpa={createMockRonpa("Jack")}
        repliable
        reactions={[{
            name: 'like',
            text: '👍',
        }, {
            name: 'love',
            text: '😍',
        }]}
        editorMode={'attachment'}
        editorActions={(onAction) => (
            <Button.Group style={{ marginTop: '5px' }}>
                <Button onClick={onAction}>Customized Action 1</Button>
                <Button onClick={onAction} type="primary">Customized Action 2 (Primary)</Button>
                <Button onClick={onAction} disabled>Customized Action 3 (Disabled)</Button>
            </Button.Group>
        )}
    />);
};
