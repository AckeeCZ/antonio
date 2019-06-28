import defaultConfig from './defaultConfig';
import * as Errors from './errors';
import { enhancedError } from './utilities';

const keys = {
    IS_AUTH: Symbol('isAuth'),
    AUTH_AXIOS: Symbol('authAxios'),
    CONFIG: Symbol('config'),
    SAGA_INITIALIZED: Symbol('sagaInitialized'),
    WAS_INITIALIZED: Symbol('wasInitialized'),
};

const state = new Map([
    [keys.IS_AUTH, false],
    [keys.AUTH_AXIOS, null],
    [keys.CONFIG, defaultConfig],
    [keys.SAGA_INITIALIZED, false],
    [keys.WAS_INITIALIZED, false],
]);

/**
 * @param {String} key
 * @param {Any} value - all types are allowed, except the 'undefined'
 * @returns {Any}
 */
const set = (key, value) => {
    if (value === undefined) {
        throw enhancedError(Errors.store.undefinedValue, TypeError);
    }

    state.set(key, value);

    return value;
};

/**
 * @param {String} key
 * @returns {Any|null}
 */
const get = key => {
    const value = state.get(key);

    return value === undefined ? null : value;
};

export { keys, set, get };
