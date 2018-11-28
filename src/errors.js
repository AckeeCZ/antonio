export const authRequestProxy = {
    unconnectedSaga: {
        name: 'authRequestProxy/unconnected-saga',
        message: `The HTTP client's 'saga' must be connected among your other sagas.`,
    },
    timeout: {
        name: 'authRequextProxy/access-token-unavailable-timeout',
        message: `Access token isn't available, task cancelled by timeout.`,
    },
};

export const create = {
    alreadyInitialized: {
        name: 'create/already-initialized',
        message: `The 'create' method may be called only once.`,
    },
};

export const store = {
    undefinedValue: {
        name: 'store-set/undefined-value',
        message: "The 'value' parameter mustn't be 'undefined', any other type is allowed.",
    },
};
