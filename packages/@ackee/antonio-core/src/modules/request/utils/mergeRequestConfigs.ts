import Headers from 'fetch-headers';

import type { RequestConfig, RequestHeaders, RequestSearchParams, FinalRequestConfig } from '../../../types';

import type { DefaultRequestConfig } from '../config';

function hasStringTag(value: any): value is Headers | URLSearchParams {
    return value[Symbol.toStringTag] !== undefined;
}

const getEntriesOf = (value: any = {}) => {
    return hasStringTag(value) ? (value.entries() as IterableIterator<[string, any]>) : Object.entries(value ?? {});
};

export function mergeHeaders(headersA?: RequestHeaders, headersB?: RequestHeaders) {
    const result = new Headers();

    for (const [key, value] of getEntriesOf(headersA)) {
        result.set(key, value);
    }

    for (const [key, value] of getEntriesOf(headersB)) {
        result.set(key, value);
    }

    return result;
}

function setSearchParam(searchParams: URLSearchParams, name: string, value: any): void {
    if (Array.isArray(value)) {
        value.forEach(item => searchParams.append(name, String(item)));
    } else {
        searchParams.append(name, String(value));
    }
}

export function mergeParams(paramsA: URLSearchParams, paramsB: URLSearchParams) {
    const result = new URLSearchParams([...paramsA.entries()]);

    // delete conflicted keys
    for (const key of paramsA.keys()) {
        if (paramsB.has(key)) {
            result.delete(key);
        }
    }

    // append new values
    for (const [key, value] of paramsB.entries()) {
        setSearchParam(result, key, value);
    }

    return result;
}

function parseParams(params?: RequestSearchParams) {
    if (!params || params instanceof URLSearchParams) {
        return params || new URLSearchParams();
    }

    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        setSearchParam(searchParams, key, value);
    });

    return searchParams;
}

export function mergeRequestConfigs(configA: DefaultRequestConfig, configB: RequestConfig = {}) {
    const result = {
        ...configA,
        ...configB,
    };

    if (configA.headers || configB.headers) {
        result.headers = mergeHeaders(configA.headers, configB.headers);
    }

    if (configA.uriParams && configB.uriParams) {
        result.uriParams = {
            ...configA.uriParams,
            ...configB.uriParams,
        };
    }

    if (configA.params || configB.params) {
        result.params = mergeParams(parseParams(configA.params), parseParams(configB.params));
    }

    if (configB.cancelToken) {
        delete result.cancelToken;
        result.signal = configB.cancelToken;
    }

    return result as FinalRequestConfig;
}
