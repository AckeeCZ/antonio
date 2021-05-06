module.exports = {
    extends: '../../../babel.config.js',
    plugins: [
        [
            'babel-plugin-module-resolver',
            {
                alias: {
                    types: './src/types',
                },
            },
        ],
    ],
};
