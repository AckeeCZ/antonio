module.exports = {
    extends: '../../../babel.config.js',
    plugins: [
        [
            'babel-plugin-module-resolver',
            {
                alias: {
                    config: './src/config',
                    constants: './src/constants',
                    modules: './src/modules',
                    services: './src/services',
                    types: './src/types',
                },
            },
        ],
    ],
};
