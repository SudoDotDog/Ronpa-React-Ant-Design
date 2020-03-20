import * as React from 'react';
import { Button } from 'antd';
import { RonpaComments } from "../src";
import { createMockRonpa } from "./mock/ronpa";
import 'antd/dist/antd.css';

export default { title: 'Button' };

export const withText = () => <Button>Hello Button</Button>;

export const withEmoji = () => (
    <RonpaComments
        contentStyle={{
            fontStyle: 'italic',
        }}
        contentLimit={100}
        username="Jack"
        uploadFile={async () => ({
            path: 'https://google.com/robots.txt',
            uploadedAt: new Date(),
        })}
        onAction={console.log}
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
    />
);
