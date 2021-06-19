const path = require('path');

module.exports = {
    entryPoints: ['./src/index.ts'],
    out: 'docs/api',
    hideGenerator: true,
    includeVersion: true,
    plugin: ['typedoc-plugin-markdown'],
    theme: path.resolve(__dirname, 'node_modules/typedoc-github-wiki-theme/dist'),
};
