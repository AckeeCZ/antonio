const path = require('path');

module.exports = {
    presets: [
        [
            '@babel/env',
            {
                modules: process.env.BABEL_ENV === 'es' ? false : 'auto',
            },
        ],
    ],
    plugins: [
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-proposal-export-namespace-from',
        '@babel/plugin-transform-runtime',
        [
            'babel-plugin-custom-import-path-transform',
            {
                transformImportPath: path.resolve(__dirname, 'scripts/transformImportPath.js'),
            },
        ],
    ],
    ignore: ['**/__tests__/'],
};
