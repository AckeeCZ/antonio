import type { RequestSearchParams } from '../../../../types';

const isValidSearchParam = (value: string) => {
    return value !== 'undefined' && value !== 'null' && value !== '';
};

export function getValidSearchParams(searchParams?: URLSearchParams): URLSearchParams {
    const validSearchParams = new URLSearchParams();

    if (searchParams !== undefined) {
        for (const [name, value] of searchParams.entries()) {
            if (isValidSearchParam(value)) {
                validSearchParams.append(name, value);
            }
        }
    }

    return validSearchParams;
}

export function encodeParamsToSearchParams(params?: RequestSearchParams): URLSearchParams | undefined {
    if (params === undefined) {
        return;
    }

    if (params instanceof URLSearchParams) {
        return params;
    }

    const searchParams = new URLSearchParams();

    for (const [name, value] of Object.entries(params)) {
        if (Array.isArray(value)) {
            value.forEach(item => searchParams.append(name, item));
        } else {
            searchParams.append(name, value);
        }
    }

    return searchParams;
}
