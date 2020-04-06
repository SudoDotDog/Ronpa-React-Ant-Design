/**
 * @author WMXPY
 * @namespace React_Ant_Design_Stories
 * @description Ronpa
 * @override Story
 */

import { Button } from 'antd';
import 'antd/dist/antd.css';
import * as React from 'react';
import { RonpaComments } from "../src/index";
import { createMockRonpa } from './mock/ronpa';

export default {
    title: 'Ronpa',
    component: RonpaComments,
};

export class ExamplePlayground extends React.Component {

    public readonly state = {

        ronpa: createMockRonpa("Jack"),
    };

    public render() {
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
            editorMode="dynamic"
            editorActions={(onAction, shouldEmit) =>
                <Button
                    style={{
                        marginTop: '5px',
                    }}
                    type="primary"
                    onClick={onAction}
                    disabled={!shouldEmit()}
                >
                    GO!
                </Button>
            }
            onAction={(action) => {
                console.log(action);
                const ronpa = this.state.ronpa;
                ronpa.apply(action);
                this.setState({
                    ronpa,
                });
            }}
            ronpa={this.state.ronpa}
            repliable
            reactions={[{
                name: 'like',
                text: '👍',
            }, {
                name: 'love',
                text: '😍',
            }]}
        />);
    }
}
