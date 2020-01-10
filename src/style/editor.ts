/**
 * @author WMXPY
 * @namespace Style
 * @description Editor
 */

import { JSSStyle, StyleManager } from "@sudoo/jss";

const editorStyleBase: JSSStyle = {

    editor: {
        transition: '0.2s all',
        overflow: 'hidden',
    },
    visible: {
        opacity: 1,
        maxHeight: '256px',
    },
    invisible: {
        opacity: 0,
        maxHeight: '0px',
    },
    submitButton: {
        marginTop: '5px',
    },
    textAreaWithDrop: {
        borderBottomLeftRadius: "0 !important",
        borderBottomRightRadius: "0 !important",
    },
    uploadIndicator: {
        borderTop: '0px !important',
        borderTopLeftRadius: "0 !important",
        borderTopRightRadius: "0 !important",
        textAlign: 'left !important',
    },
};

export const editorStyle: StyleManager = StyleManager.create(editorStyleBase, 'Editor').setPrefix('Ronpa-React-Ant-Design-');
