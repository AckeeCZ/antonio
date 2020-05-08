import { Methods } from './constants';
import * as DefaultConfig from './config';
import { HTTPError } from './errors';
import { createRequestUrl, formatRequestBody, setRequestHeaders, parseResponse, mergeConfig } from './utils';

async function request(method, requestUrl, body, requestConfig, defaultRequestConfig) {
    const config = mergeConfig(defaultRequestConfig, requestConfig);

    const url = createRequestUrl(requestUrl, config);

    const { mode, credentials, cache, redirect, referrer, referrerPolicy, integrity, keepalive, signal } = config;

    const request = new Request(url, {
        method,
        body: formatRequestBody(body, config),
        headers: setRequestHeaders(method, config),
        mode,
        credentials,
        cache,
        redirect,
        referrer,
        referrerPolicy,
        integrity,
        keepalive,
        signal,
    });

    const response = await fetch(request);

    if (!response.ok) {
        // TODO: try response.error instead
        throw new HTTPError('Fetch error:', response.statusText);
    }

    const data = await parseResponse(config.responseType, response);

    return {
        request,
        response,
        data,
    };
}

export function create(customRequestConfig) {
    const customDefaultRequestConfig = mergeConfig(DefaultConfig.RequestConfig, customRequestConfig);

    const instance = {
        defaults: customDefaultRequestConfig,

        post(url, body, requestConfig) {
            return request(Methods.POST, url, body, requestConfig, customDefaultRequestConfig);
        },
        put(url, body, requestConfig) {
            return request(Methods.PUT, url, body, requestConfig, customDefaultRequestConfig);
        },
        patch(url, body, requestConfig) {
            return request(Methods.PATCH, url, body, requestConfig, customDefaultRequestConfig);
        },

        get(url, requestConfig) {
            return request(Methods.GET, url, undefined, requestConfig, customDefaultRequestConfig);
        },
        delete(url, requestConfig) {
            return request(Methods.DELETE, url, undefined, requestConfig, customDefaultRequestConfig);
        },
        head(url, requestConfig) {
            return request(Methods.HEAD, url, undefined, requestConfig, customDefaultRequestConfig);
        },
        options(url, requestConfig) {
            return request(Methods.OPTIONS, url, undefined, requestConfig, customDefaultRequestConfig);
        },
    };

    return Object.freeze(instance);
}
