/**
 * @type {import('typedoc').TypeDocOptions}
 */
module.exports = {
    entryPoints: ['./src/index.ts'],
    out: 'docs',
    hideGenerator: true,
    includeVersion: true,
    plugin: ['typedoc-plugin-markdown'],
    readme: 'none',
};
