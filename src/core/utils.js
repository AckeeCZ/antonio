import { put } from 'redux-saga/effects';
import { checkAccessTokenExpiration } from '@ackee/petrus';

function* applyRequestInterceptors(interceptors = [], args = []) {
    if (!Array.isArray(interceptors)) {
        return args;
    }

    let nextArgs = args;

    for (const interceptor of interceptors) {
        nextArgs = yield interceptor(nextArgs);
    }

    return nextArgs;
}

function getApiErrorStatus(e) {
    if (e.response && e.response.request && e.response.request.status) {
        return e.response.request.status;
    }

    return null;
}

export function createRequestProxy(requestInterceptors = []) {
    return function proxyFactory(handler) {
        return function* apiRequest(...args) {
            const interceptedArgs = yield applyRequestInterceptors(requestInterceptors, args);

            try {
                return yield handler(...interceptedArgs);
            } catch (e) {
                if (getApiErrorStatus(e) === 401) {
                    yield put(checkAccessTokenExpiration());
                }

                throw e;
            }
        };
    };
}
