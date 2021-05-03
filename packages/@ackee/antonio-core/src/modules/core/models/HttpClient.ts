import { RequestConfig, RequestBody } from '../types';
import { defaultRequestConfig } from '../config';
import { mergeConfig } from '../utils';

import request from '../request';

class HttpClient {
    readonly defaults: RequestConfig;

    constructor(customRequestConfig?: RequestConfig) {
        this.defaults = Object.freeze<RequestConfig>(mergeConfig(defaultRequestConfig, customRequestConfig));
    }

    post(url: string, body: RequestBody, requestConfig?: RequestConfig) {
        return request('post', url, body, requestConfig, this.defaults);
    }

    put(url: string, body: RequestBody, requestConfig?: RequestConfig) {
        return request('put', url, body, requestConfig, this.defaults);
    }

    patch(url: string, body: RequestBody, requestConfig?: RequestConfig) {
        return request('patch', url, body, requestConfig, this.defaults);
    }

    get(url: string, requestConfig?: RequestConfig) {
        return request('get', url, undefined, requestConfig, this.defaults);
    }

    delete(url: string, requestConfig?: RequestConfig) {
        return request('delete', url, undefined, requestConfig, this.defaults);
    }

    head(url: string, requestConfig?: RequestConfig) {
        return request('head', url, undefined, requestConfig, this.defaults);
    }

    options(url: string, requestConfig?: RequestConfig) {
        return request('options', url, undefined, requestConfig, this.defaults);
    }
}

export default HttpClient;
