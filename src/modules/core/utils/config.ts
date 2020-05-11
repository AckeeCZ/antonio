import { RequestConfig, RequestHeaders, RequestSearchParams } from '../constants';

const getSearchParamsEntries = (value: RequestSearchParams) =>
    value instanceof URLSearchParams ? value.entries() : Object.entries(value ?? {});

export function mergeUrlSearchParams(paramsA: RequestSearchParams, paramsB: RequestSearchParams): URLSearchParams {
    const result = new URLSearchParams();

    for (const [key, value] of getSearchParamsEntries(paramsA)) {
        result.set(key, value);
    }

    for (const [key, value] of getSearchParamsEntries(paramsB)) {
        result.set(key, value);
    }

    return result;
}

const getHeadersEntries = (value: RequestHeaders) =>
    value instanceof Headers ? value.entries() : Object.entries(value ?? {});

function mergeHeaders(headersA: RequestHeaders, headersB: RequestHeaders): HeadersInit {
    const result = new Headers();

    for (const [key, value] of getHeadersEntries(headersA)) {
        result.set(key, value);
    }

    for (const [key, value] of getHeadersEntries(headersB)) {
        result.set(key, value);
    }

    return result;
}

export function mergeConfig(
    // FIXME: remove & { [key: string]: any }
    configA: RequestConfig & { [key: string]: any } = {},
    configB: RequestConfig & { [key: string]: any } = {},
): RequestConfig {
    const result: RequestConfig & { [key: string]: any } = {};

    for (const [key, value] of Object.entries(configA)) {
        const newValue = configB[key];

        switch (key) {
            case 'headers':
                result[key] = mergeHeaders(value, newValue);
                break;

            case 'uriParams':
                result[key] = {
                    ...value,
                    ...newValue,
                };
                break;

            case 'searchParams':
                result[key] = mergeUrlSearchParams(value, newValue);
                break;

            default:
                result[key] = newValue ?? value;
        }
    }

    return result;
}
