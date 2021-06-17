import type { ResponseDataType, ResponseData } from '../../../types';
import { Header } from '../../../constants';

import { parseContentTypeHeader, parseMimeTypes } from '../responseDataTypes';
import { iterableStream } from '../iterableStream';

function hasJsonMimeType(headers: Headers) {
    const contentType = headers.get(Header.CONTENT_TYPE);

    if (!contentType) {
        return false;
    }

    const mimeTypes = parseMimeTypes(parseContentTypeHeader(contentType));

    return mimeTypes.includes('application/json');
}

export function hasEmptyContentLength(headers: Headers) {
    return headers.get(Header.CONTENT_LENGTH) === '0';
}

export async function parseResponse(
    responseDataType: ResponseDataType | undefined | null,
    response: Response,
): Promise<ResponseData | null> {
    switch (responseDataType) {
        case 'json':
        case 'blob':
        case 'formData':
        case 'text':
        case 'arrayBuffer':
            return response[responseDataType]();

        case 'iterableStream':
            return iterableStream(response.body, hasJsonMimeType(response.headers));

        case 'stream':
            return response.body;

        default:
            return null;
    }
}
