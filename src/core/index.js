import * as Store from '../store';
import saga from '../sagas';
import * as Errors from '../errors';
import { enhancedError } from '../utilities';

import createApiWithAxios from './createApiWithAxios';
import { requestInterceptors } from './interceptors';
import { createRequestProxy } from './utils';

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

    const nonAuthInterceptorsConfig = {
        auth: false,
    };

    const authInterceptorsConfig = {
        auth: true,
    };

    const api = createApiWithAxios(
        axiosRequestConfig,
        createRequestProxy(requestInterceptors(nonAuthInterceptorsConfig)),
    );

    const authApi = createApiWithAxios(
        axiosRequestConfig,
        createRequestProxy(requestInterceptors(authInterceptorsConfig)),
    );

    Store.set(Store.keys.AUTH_AXIOS, authApi);

    return {
        api,
        authApi,
        saga,
    };
}
