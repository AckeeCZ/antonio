module.exports = function(api) {
    const plugins = [
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-proposal-export-namespace-from',
        '@babel/plugin-transform-runtime',
    ];

    const presets = {
        lib: ['@babel/preset-env'],
        es: [
            [
                '@babel/preset-env',
                {
                    modules: false,
                },
            ],
        ],
    };

    return {
        plugins,
        presets: presets[api.env()],
    };
};
