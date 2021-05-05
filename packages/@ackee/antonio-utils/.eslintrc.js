const path = require('path');

module.exports = {
    extends: ['../../../.eslintrc'],
    settings: {
        'import/resolver': {
            node: {
                paths: [path.resolve(__dirname, './src')],
                extensions: ['.ts'],
            },
        },
    },
};
