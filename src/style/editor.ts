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
        outline: 0,
    },
    visible: {
        opacity: 1,
    },
    invisible: {
        opacity: 0,
    },
    submitButton: {
        marginTop: '5px',
    },
    textAreaWithDrop: {
        borderBottomLeftRadius: '0 !important',
        borderBottomRightRadius: '0 !important',
    },
    uploadIndicator: {
        borderTop: '1px solid transparent !important',
        borderTopLeftRadius: '0 !important',
        borderTopRightRadius: '0 !important',
        textAlign: 'left !important',
        '&:hover': {
            border: '1px solid #40a9ff !important',
        },
    },
    attachmentContainer: {
        padding: '4px',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: '#d9d9d9',
        borderTopWidth: 1,
        borderTopColor: 'transparent',
        transition: '0.3s all',
        '&:hover': {
            borderColor: '#40a9ff',
        },
    },
    draggable: {
        position: 'relative',
        outline: 0,
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
