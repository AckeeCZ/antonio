import defaultConfig from './defaultConfig';

const keys = {
    IS_AUTH: 'isAuth',
    AUTH_AXIOS: 'authAxios',
    CONFIG: 'config',
    SAGA_INITIALIZE: 'sagaInitialize',
};

const state = {
    [keys.IS_AUTH]: false,
    [keys.AUTH_AXIOS]: null,
    [keys.CONFIG]: defaultConfig,
    [keys.SAGA_INITIALIZE]: false,
};

/**
 * @param {String} key
 * @param {Any} value - all types are allowed, except the 'undefined'
 * @returns {Any}
 */
const set = (key, value) => {
    if (value === undefined) {
        throw new TypeError("The 'value' parameter mustn't be 'undefined', any other type is allowed.");
    }

    state[key] = value;

    return value;
};

/**
 * @param {String} key
 * @returns {Any|null}
 */
const get = key => {
    const value = state[key];

    return value === undefined ? null : value;
};

export { keys, set, get };
