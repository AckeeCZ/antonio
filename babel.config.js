const path = require('path');

const config = {
    presets: ['@babel/preset-typescript'],
    plugins: [
        '@babel/proposal-class-properties',
        '@babel/proposal-object-rest-spread',
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

if (process.env.BABEL_ENV === 'es') {
    config.presets.push([
        '@babel/modules',
        {
            loose: true,
        },
    ]);
} else {
    config.presets.push([
        '@babel/env',
        {
            loose: true,
        },
    ]);
}

module.exports = config;
