import { RequestConfigFields } from '../constants';

export function mergeUrlSearchParams(searchParamsA, searchParamsB) {
    const result = new URLSearchParams();
    const getEntries = value => (value instanceof URLSearchParams ? value.entries() : Object.entries(value ?? {}));

    for (const [key, value] of getEntries(searchParamsA)) {
        result.set(key, value);
    }

    for (const [key, value] of getEntries(searchParamsB)) {
        result.set(key, value);
    }

    return result;
}

function mergeHeaders(searchParamsA, searchParamsB) {
    const result = new Headers();
    const getEntries = value => (value instanceof Headers ? value.entries() : Object.entries(value ?? {}));

    for (const [key, value] of getEntries(searchParamsA)) {
        result.set(key, value);
    }

    for (const [key, value] of getEntries(searchParamsB)) {
        result.set(key, value);
    }

    return result;
}

export function mergeConfig(requestConfigA, requestConfigB = {}) {
    const result = {};

    for (const [key, value] of Object.entries(requestConfigA || {})) {
        const newValue = requestConfigB[key];

        switch (key) {
            case RequestConfigFields.HEADERS:
                result[key] = mergeHeaders(value, newValue);
                break;

            case RequestConfigFields.URI_PARAMS:
                result[key] = {
                    ...value,
                    ...newValue,
                };
                break;

            case RequestConfigFields.SEARCH_PARAMS:
                result[key] = mergeUrlSearchParams(value, newValue);
                break;

            default:
                result[key] = newValue ?? value;
        }
    }

    return result;
}
