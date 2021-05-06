import Headers from 'fetch-headers';
import { RequestConfig, RequestHeaders, RequestSearchParams } from 'types';
import { DefaultRequestConfig } from '../request-config';

const getSearchParamsEntries = (value?: RequestSearchParams) =>
    value instanceof URLSearchParams ? value.entries() : Object.entries(value ?? {});

export function mergeUrlSearchParams(paramsA?: RequestSearchParams, paramsB?: RequestSearchParams): URLSearchParams {
    const result = new URLSearchParams();

    for (const [key, value] of getSearchParamsEntries(paramsA)) {
        result.set(key, value);
    }

    for (const [key, value] of getSearchParamsEntries(paramsB)) {
        result.set(key, value);
    }

    return result;
}

const getHeadersEntries = (value?: RequestHeaders) =>
    value instanceof Headers ? value.entries() : Object.entries(value ?? {});

function mergeHeaders(headersA?: RequestHeaders, headersB?: RequestHeaders): Headers {
    const result = new Headers();

    for (const [key, value] of getHeadersEntries(headersA)) {
        result.set(key, value);
    }

    for (const [key, value] of getHeadersEntries(headersB)) {
        result.set(key, value);
    }

    return result;
}

export function mergeRequestConfigs(configA: DefaultRequestConfig, configB: RequestConfig = {}): DefaultRequestConfig {
    const result: DefaultRequestConfig = {
        ...configA,
        ...configB,
    };

    if (configA.headers || configB.headers) {
        result.headers = mergeHeaders(configA.headers, configB.headers);
    }

    if (configA.uriParams || configB.uriParams) {
        result.uriParams = {
            ...configA.uriParams,
            ...configB.uriParams,
        };
    }

    if (configA.searchParams || configB.searchParams) {
        result.searchParams = mergeUrlSearchParams(configA.searchParams, configB.searchParams);
    }

    if (configB.cancelToken) {
        delete result.cancelToken;
        result.signal = configB.cancelToken;
    }

    return result;
}
