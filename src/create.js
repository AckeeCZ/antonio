import axios from 'axios';
import { take } from 'redux-saga/effects';
import { actionTypes } from 'ackee-redux-token-auth';

import * as Store from './store';

const authRequestProxy = methodHandler =>
    function* (...args) {
        if (!Store.get(Store.keys.IS_AUTH)) {
            yield take(actionTypes.ACCESS_TOKEN_AVAILABLE);
        }

        return yield methodHandler(...args);
    };

export default function create(options) {
    const axiosClient = axios.create(options);
    const authAxiosClient = axios.create(options);

    Store.set(Store.keys.AUTH_AXIOS, authAxiosClient);

    const api = {};
    const authApi = {};

    // - unwrap axios HTTP method handlers
    // - add custom proxies
    for (const key of Object.keys(axiosClient)) {
        api[key] = axiosClient[key];
        authApi[key] = authRequestProxy(authAxiosClient[key]);
    }

    Object.freeze(api);
    Object.freeze(authApi);

    return {
        api,
        authApi,
    };
}
