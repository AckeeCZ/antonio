import { call } from 'redux-saga/effects';

import * as Store from '../store';
import saga from '../sagas';
import * as Errors from '../errors';
import { enhancedError } from '../utilities';

import setAccessTokenTimeout from './setAccessTokenTimeout';
import createApiWithAxios from './createApiWithAxios';

const authRequestProxy = methodHandler =>
    function*(...args) {
        if (!Store.get(Store.keys.IS_AUTH)) {
            if (!Store.get(Store.keys.SAGA_INITIALIZED)) {
                throw enhancedError(Errors.authRequestProxy.unconnectedSaga);
            }

            yield call(setAccessTokenTimeout);
        }

        return yield methodHandler(...args);
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
