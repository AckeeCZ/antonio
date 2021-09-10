import Headers from 'fetch-headers';

import type { RequestConfig, RequestHeaders, RequestSearchParams } from '../../../types';

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
    searchParams.delete(name);

    if (Array.isArray(value)) {
        value.forEach(item => searchParams.append(name, String(item)));
    } else {
        searchParams.append(name, String(value));
    }
}

function mergeParams(paramsA?: RequestSearchParams, paramsB?: RequestSearchParams): URLSearchParams {
    const result = new URLSearchParams();

    for (const [key, value] of getEntriesOf(paramsA)) {
        setSearchParam(result, key, value);
    }

    for (const [key, value] of getEntriesOf(paramsB)) {
        setSearchParam(result, key, value);
    }

    return result;
}

export interface FinalRequestConfig extends DefaultRequestConfig {
    params?: URLSearchParams;
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
        result.params = mergeParams(configA.params, configB.params);
    }

    if (configB.cancelToken) {
        delete result.cancelToken;
        result.signal = configB.cancelToken;
    }

    return result as FinalRequestConfig;
}
