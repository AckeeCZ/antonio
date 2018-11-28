import axios from 'axios';
import { delay } from 'redux-saga';
import { take, call, race } from 'redux-saga/effects';
import { actionTypes } from 'ackee-redux-token-auth';

import * as Store from './store';
import saga from './sagas';
import * as errors from './errors';
import { enhancedError } from './utilities';

/**
 * setAccessTokenTimeout is called when access token isn't available (IS_AUTH is false).
 * If 'timeDuration' isn't falsy, set timeout for that duration.
 * The timeout is cancelled if access token will become available sooner than the timeout ends,
 * otherwise the 'errors.authRequestProxy.timeout' error is thrown.
 */
function* setAccessTokenTimeout() {
    const { accessTokenUnavailableTimeout } = Store.get(Store.keys.CONFIG);
    const { enabled, duration, silent } = accessTokenUnavailableTimeout;

    if (!enabled) {
        return;
    }

    const result = yield race({
        timeout: call(delay, duration),
        accessTokenAvailable: take(actionTypes.ACCESS_TOKEN_AVAILABLE),
    });

    if (result.timeout && !silent) {
        throw enhancedError(errors.authRequestProxy.timeout);
    }
}

const authRequestProxy = methodHandler =>
    function*(...args) {
        if (!Store.get(Store.keys.IS_AUTH)) {
            if (!Store.get(Store.keys.SAGA_INITIALIZED)) {
                throw enhancedError(errors.authRequestProxy.unconnectedSaga);
            }

            yield call(setAccessTokenTimeout);
        }

        return yield methodHandler(...args);
    };

function createApiWithAxios(options, proxy) {
    const axiosClient = axios.create(options);
    const api = {};

    // - unwrap axios HTTP method handlers
    // - add custom proxies
    for (const key of Object.keys(axiosClient)) {
        const methodHandler = axiosClient[key];
        api[key] = proxy ? proxy(methodHandler) : methodHandler;
    }

    Object.freeze(api);

    return [api, axiosClient];
}

export default function create(axionsRequestConfig = {}, customConfig = {}) {
    if (Store.get(Store.keys.WAS_INITIALIZED)) {
        throw enhancedError(errors.create.errors);
    }

    Store.set(Store.keys.WAS_INITIALIZED, true);

    const defaultConfig = Store.get(Store.keys.CONFIG);

    Store.set(Store.keys.CONFIG, {
        ...defaultConfig,
        ...customConfig,
    });

    const [api] = createApiWithAxios(axionsRequestConfig);
    const [authApi, authAxiosClient] = createApiWithAxios(axionsRequestConfig, authRequestProxy);

    Store.set(Store.keys.AUTH_AXIOS, authAxiosClient);

    return {
        api,
        authApi,
        saga,
    };
}
