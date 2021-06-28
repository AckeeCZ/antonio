import type { RequestSearchParams } from '../../../../types';

// TODO: add test
export function getValidSearchParams(searchParams?: URLSearchParams): URLSearchParams {
    const validSearchParams = new URLSearchParams();

    if (searchParams !== undefined) {
        for (const [name, value] of searchParams.entries()) {
            validSearchParams.append(name, value);
        }
    }

    return validSearchParams;
}

// TODO: add test
export function encodeParamsToSearchParams(params?: RequestSearchParams): URLSearchParams | undefined {
    if (params === undefined) {
        return;
    }

    if (params instanceof URLSearchParams) {
        return params;
    }

    // TODO: if requestCOnfig contains paramsSerializer
    // BE might require array items to have been suffixed with `[]`:
    // ['includeTag[]', 1], not only ['includeTag', 1] (e.g. on Expenses)

    const searchParams = new URLSearchParams();

    for (const [name, value] of Object.entries(params)) {
        if (Array.isArray(value)) {
            value.forEach(item => searchParams.append(name, item));
        } else {
            searchParams.append(name, String(value));
        }
    }

    return searchParams;
}
