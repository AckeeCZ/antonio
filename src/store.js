import defaultConfig from './defaultConfig';
import * as errors from './errors';
import { enhancedError } from './utilities';

const keys = {
    IS_AUTH: 'isAuth',
    AUTH_AXIOS: 'authAxios',
    CONFIG: 'config',
    SAGA_INITIALIZED: 'sagaInitialized',
    WAS_INITIALIZED: 'wasInitialized',
};

const state = {
    [keys.IS_AUTH]: false,
    [keys.AUTH_AXIOS]: null,
    [keys.CONFIG]: defaultConfig,
    [keys.SAGA_INITIALIZED]: false,
    [keys.WAS_INITIALIZED]: false,
};

/**
 * @param {String} key
 * @param {Any} value - all types are allowed, except the 'undefined'
 * @returns {Any}
 */
const set = (key, value) => {
    if (value === undefined) {
        throw enhancedError(errors.store.undefinedValue, TypeError);
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
