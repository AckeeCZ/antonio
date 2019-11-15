const path = require('path');

const config = {
    presets: [],
    plugins: [
        [
            'babel-plugin-custom-import-path-transform',
            {
                transformImportPath: path.resolve(__dirname, 'scripts/transformImportPath.js'),
            },
        ],
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

    config.plugins.push(...['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-transform-runtime']);
}

module.exports = config;
