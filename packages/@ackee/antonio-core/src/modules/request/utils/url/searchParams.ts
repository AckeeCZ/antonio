import type { RequestSearchParams } from '../../../../types';

export function encodeParamsToSearchParams(params?: RequestSearchParams) {
    if (params === undefined) {
        return new URLSearchParams();
    }

    if (params instanceof URLSearchParams) {
        return params;
    }

    const searchParams = new URLSearchParams();

    for (const [name, value] of Object.entries(params)) {
        if (Array.isArray(value)) {
            value.forEach(item => searchParams.append(name, String(item)));
        } else {
            searchParams.append(name, String(value));
        }
    }

    return searchParams;
}
