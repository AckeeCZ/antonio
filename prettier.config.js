const config = require('prettier-config-ackee');
module.exports = Object.assign({}, config, {
    overrides: [
        {
            files: '*.ts',
            parser: 'babel-ts',
        },
        {
            files: '*.json',
            parser: 'json',
        },
        {
            files: '*.md',
            parser: 'markdown',
        },
    ],
});
