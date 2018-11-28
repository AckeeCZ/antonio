export const authRequestProxy = {
    unconnectedSaga: {
        name: 'authRequestProxy-unconnected-saga',
        message: `ackee-http-client: The HTTP client's 'saga' must be connected among your other sagas.`,
    },
};

export const create = {
    alreadyInitialized: {
        name: 'create-already-initialized',
        message: `ackee-http-client: the 'create' method may be called only once.`,
    },
};

export const store = {
    undefinedValue: {
        name: 'store-set-undefined-value',
        message: "The 'value' parameter mustn't be 'undefined', any other type is allowed.",
    },
};
