const path = require('path');

const config = {
    presets: [
        '@babel/typescript',
        [
            '@babel/env',
            {
                useBuiltIns: false,
                loose: true,
                modules: false,
                bugfixes: true,
            },
        ],
    ],
    plugins: [
        [
            '@babel/proposal-class-properties',
            {
                loose: true,
            },
        ],
        '@babel/proposal-object-rest-spread',
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-proposal-nullish-coalescing-operator',
        [
            'babel-plugin-custom-import-path-transform',
            {
                transformImportPath: path.resolve(__dirname, 'scripts/transformImportPath.js'),
            },
        ],
        '@babel/plugin-transform-runtime',
    ],
    ignore: ['**/__tests__/', '**/*.test.js'],
};

module.exports = config;
