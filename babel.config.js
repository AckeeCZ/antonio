module.exports = {
    presets: [
        [
            '@babel/typescript',
            {
                onlyRemoveTypeImports: true,
                allowDeclareFields: true,
            },
        ],
        [
            '@babel/env',
            {
                useBuiltIns: 'usage',
                corejs: '3.x',
                loose: true,
                modules: process.env.BABEL_ENV === 'es' ? false : 'auto',
                bugfixes: true,
                browserslistEnv: 'production',
            },
        ],
    ],
    ignore: ['**/__tests__/', '**/*.test.js'],
};
