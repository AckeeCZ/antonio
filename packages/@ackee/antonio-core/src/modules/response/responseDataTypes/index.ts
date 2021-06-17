import type { ResponseDataType } from '../../../types';

import { parseContentTypeHeader, parseMimeTypes } from './utils';

type ResponseDataTypes = [RegExp, ResponseDataType][];

const responseDataTypes: ResponseDataTypes = [
    [new RegExp('^application/json$'), 'json'],
    [new RegExp('^text/.*$'), 'text'],
    [new RegExp('^(image|audio|video)/.*$'), 'arrayBuffer'],
    [new RegExp('^application/octet-stream$'), 'arrayBuffer'],
    [new RegExp('^multipart/form-data$'), 'formData'],
];

export function getResponseDataType(contentTypeHeader: string | null): ResponseDataType | null {
    if (contentTypeHeader === null) {
        return null;
    }

    const mimeTypes = parseMimeTypes(parseContentTypeHeader(contentTypeHeader));
    const matches = new Set<ResponseDataType>();

    for (const mimeType of mimeTypes) {
        for (const [mimeTypePattern, responseDataType] of responseDataTypes) {
            if (mimeTypePattern.test(mimeType)) {
                matches.add(responseDataType);
            }
        }
    }

    // If the received content type has ambiguous response type,
    // don't format the body at all.
    return matches.size === 1 ? matches.values().next().value : null;
}

export * from './utils';
