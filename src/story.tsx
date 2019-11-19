/**
 * @author WMXPY
 * @namespace React_Ant_Design
 * @description Story
 */

import * as React from "react";
import { storyStyle } from "./style/story";

export type RonpaStoryProps = {

    readonly style?: React.CSSProperties;
    readonly className?: string;
};

export class RonpaStory extends React.Component<RonpaStoryProps> {

    private readonly _storyStyle = storyStyle.use();

    public constructor(props: RonpaStoryProps) {

        super(props);
    }

    public render() {

        return (<div>

        </div>);
    }
}
