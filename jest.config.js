module.exports = {
    roots: ['<rootDir>/src'],
    testPathIgnorePatterns: ['/node_modules', '/lib', '/es'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    globals: {
        'ts-jest': {
            diagnostics: false,
        },
    },
};
