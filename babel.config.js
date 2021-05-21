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
    plugins: [
        [
            'babel-plugin-const-enum',
            {
                transform: 'constObject',
            },
        ],
    ],
    ignore: ['**/__tests__/', '**/*.test.js'],
};
