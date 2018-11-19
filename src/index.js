import axios from 'axios';
import { takeEvery, fork, take } from 'redux-saga/effects';
import { actionTypes } from 'ackee-redux-token-auth';

let authAxiosClient = null;
let isAuth = false;

const authRequestProxy = methodHandler =>
    function* (...args) {
        if (!isAuth) {
            yield take(actionTypes.ACCESS_TOKEN_AVAILABLE);
        }

        return yield methodHandler(...args);
    };

export function create(options) {
    const axiosClient = axios.create(options);
    authAxiosClient = axios.create(options);

    const api = {};
    const authApi = {};

    // - unwrap axios HTTP method handlers
    // - add custom proxies
    for (const key of Object.keys(axiosClient)) {
        api[key] = axiosClient[key];
        authApi[key] = authRequestProxy(authAxiosClient[key]);
    }

    return {
        api,
        authApi,
    };
}

function* manageAuthorizationHeader(headers) {
    yield takeEvery(actionTypes.ACCESS_TOKEN_AVAILABLE, action => {
        headers.common.Authorization = `Bearer ${action.payload}`;
        isAuth = true;
    });

    yield takeEvery(actionTypes.ACCESS_TOKEN_UNAVAILABLE, () => {
        isAuth = false;
        delete headers.common.Authorization;
    });
}

export function* saga() {
    yield fork(manageAuthorizationHeader, authAxiosClient.defaults.headers);
}
