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
        borderBottomLeftRadius: '0 !important',
        borderBottomRightRadius: '0 !important',
    },
    uploadIndicator: {
        borderTop: '0px !important',
        borderTopLeftRadius: '0 !important',
        borderTopRightRadius: '0 !important',
        textAlign: 'left !important',
    },
    draggable: {
        position: 'relative',
    },
    dragContent: {
        position: 'absolute',
        left: 0,
        top: 0,
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.8)',
        border: '1px solid #d9d9d9',
        borderRadius: '4px',
        userSelect: 'none',
        pointerEvents: 'none',
        transition: '0.3s all',
    },
    dragging: {
        opacity: 1,
    },
    notDragging: {

        opacity: 0,
    },
};

export const editorStyle: StyleManager = StyleManager.create(editorStyleBase, 'Editor').setPrefix('Ronpa-React-Ant-Design-');
