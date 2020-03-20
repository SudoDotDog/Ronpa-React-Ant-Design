/**
 * @author WMXPY
 * @namespace Style
 * @description File
 */

import { StyleManager, Styles } from "@sudoo/jss";

const fileStyleBase: Styles = {

    list: {
        marginTop: '6px',
        border: '1px solid #d9d9d9',
        borderRadius: '4px',
    },
    item: {
        display: 'grid',
        gridTemplateAreas: [
            `"icon name action"`,
            `"icon size action"`,
        ].join(''),
        gridTemplateColumns: 'auto 1fr auto',
        gridTemplateRows: '1fr auto',

        columnGap: '10px',

        paddingTop: '5px',
        paddingBottom: '5px',
        paddingLeft: '8px',
        paddingRight: '12px',

        borderBottom: '1px solid #d9d9d9',
        '&:last-child': {
            borderBottom: '0px',
        },
    },
    icon: {
        gridArea: 'icon',
        alignSelf: 'center',
    },
    name: {
        gridArea: 'name',
        color: 'rgba(0,0,0,.45)',
    },
    size: {
        gridArea: 'size',
    },
    action: {
        gridArea: 'action',
        alignSelf: 'center',
    },
};

export const fileStyle: StyleManager = StyleManager.create(fileStyleBase, 'File').setPrefix('Ronpa-React-Ant-Design-');
