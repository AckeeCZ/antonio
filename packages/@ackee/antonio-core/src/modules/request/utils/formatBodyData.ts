import { RequestBodyData, Primitive } from '../../../types';

const primitives = new Set<Primitive>(['number', 'string', 'boolean']);

function isStringifable(data: RequestBodyData): boolean {
    return (
        data === null ||
        primitives.has(typeof data) ||
        Array.isArray(data) ||
        (typeof data === 'object' && data.constructor === Object)
    );
}

export function formatBodyData(data?: RequestBodyData | null) {
    if (data === undefined || data === null) {
        return undefined;
    }

    if (isStringifable(data)) {
        return JSON.stringify(data);
    }

    if (typeof data === 'bigint') {
        return data.toString();
    }

    return data as BodyInit;
}
