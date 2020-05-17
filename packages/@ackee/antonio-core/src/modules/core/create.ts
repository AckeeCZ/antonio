import { RequestConfig, RequestBody } from './constants';
import { defaultRequestConfig } from './config';
import { mergeConfig } from './utils';

import request from './request';

export function create(customRequestConfig?: RequestConfig) {
    const defaults = mergeConfig(defaultRequestConfig, customRequestConfig);

    const instance = {
        defaults,

        post(url: string, body: RequestBody, requestConfig?: RequestConfig) {
            return request('post', url, body, requestConfig, defaults);
        },
        put(url: string, body: RequestBody, requestConfig?: RequestConfig) {
            return request('put', url, body, requestConfig, defaults);
        },
        patch(url: string, body: RequestBody, requestConfig?: RequestConfig) {
            return request('patch', url, body, requestConfig, defaults);
        },

        get(url: string, requestConfig?: RequestConfig) {
            return request('get', url, undefined, requestConfig, defaults);
        },
        delete(url: string, requestConfig?: RequestConfig) {
            return request('delete', url, undefined, requestConfig, defaults);
        },
        head(url: string, requestConfig?: RequestConfig) {
            return request('head', url, undefined, requestConfig, defaults);
        },
        options(url: string, requestConfig?: RequestConfig) {
            return request('options', url, undefined, requestConfig, defaults);
        },
    };

    return Object.freeze(instance);
}
