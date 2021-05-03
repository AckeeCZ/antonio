const path = require('path');

const config = {
    presets: [
        '@babel/typescript',
        [
            '@babel/env',
            {
                useBuiltIns: 'usage',
                corejs: '3.11',
                loose: true,
                modules: false,
                bugfixes: true,
                browserslistEnv: 'production',
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
        [
            'babel-plugin-transform-imports',
            {
                lodash: {
                    transform: 'lodash/${member}',
                    preventFullImport: true,
                },
            },
        ],
        '@babel/plugin-transform-runtime',
    ],
    ignore: ['**/__tests__/', '**/*.test.js'],
};

module.exports = config;
