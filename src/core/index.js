import { call, put } from 'redux-saga/effects';
import { verifyAccessTokenAvailability } from '@ackee/petrus/es/actions';

import * as Store from '../store';
import saga from '../sagas';
import * as Errors from '../errors';
import { enhancedError } from '../utilities';

import setAccessTokenTimeout from './setAccessTokenTimeout';
import createApiWithAxios from './createApiWithAxios';

// TODO: this is kind of solve the problem,
// but better would to repeat the request one more time
// when the access token availability verification successfully resolves.
function* handleResponse(response) {
    switch (response.request.status) {
        case 401:
            // 401 - unauthorized
            yield put(verifyAccessTokenAvailability());
            break;

        default:
    }
}

const authRequestProxy = methodHandler =>
    function*(...args) {
        if (!Store.get(Store.keys.IS_AUTH)) {
            if (!Store.get(Store.keys.SAGA_INITIALIZED)) {
                throw enhancedError(Errors.authRequestProxy.unconnectedSaga);
            }

            yield call(setAccessTokenTimeout);
        }

        const response = yield methodHandler(...args);

        yield handleResponse(response);

        return response;
    };

export function create(axiosRequestConfig = {}, customConfig = {}) {
    if (Store.get(Store.keys.WAS_INITIALIZED)) {
        throw enhancedError(Errors.create.errors);
    }

    Store.set(Store.keys.WAS_INITIALIZED, true);

    const defaultConfig = Store.get(Store.keys.CONFIG);

    Store.set(Store.keys.CONFIG, {
        ...defaultConfig,
        ...customConfig,
        accessTokenUnavailableTimeout: {
            ...defaultConfig.accessTokenUnavailableTimeout,
            ...customConfig.accessTokenUnavailableTimeout,
        },
    });

    const [api] = createApiWithAxios(axiosRequestConfig);
    const [authApi, authAxiosClient] = createApiWithAxios(axiosRequestConfig, authRequestProxy);

    Store.set(Store.keys.AUTH_AXIOS, authAxiosClient);

    return {
        api,
        authApi,
        saga,
    };
}
