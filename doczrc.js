/**
 * @author WMXPY
 * @namespace React_Ant_Design
 * @description DOCZ_RC
 */

export default {
    title: 'Ronpa React Ant Design',
    codeSandbox: false,
    typescript: true,
    modifyBabelRc: (babelrc) => {
        const newBabelRc = {
            ...babelrc,
            plugins: [
                ...babelrc.plugins,
            ],
        };

        return newBabelRc;
    },
};
