/**
 * @author WMXPY
 * @namespace React_Ant_Design
 * @description DOCZ_RC
 */

export default {
    title: 'Ronpa React Ant Design',
    codeSandbox: false,
    typescript: true,
    modifyBundlerConfig: (bundlerConfig) => {
        const rules = [
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
        ];
        bundlerConfig.module.rules.push(...rules);
        return bundlerConfig;
    },
    modifyBabelRc: babelrc => {
        const newBabelRc = {
            ...babelrc,
            plugins: [
                ...babelrc.plugins,
                "@babel/plugin-proposal-numeric-separator",
            ],
        };
        return newBabelRc;
    },
};
