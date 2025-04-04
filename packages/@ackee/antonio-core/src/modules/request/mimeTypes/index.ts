import type { RequestBody } from '../../../types';

export const defaultRequestMimeTypes = {
    string: 'application/json',
    Blob: 'application/octet-stream',
    File: 'application/octet-stream',
    ArrayBuffer: 'application/octet-stream',
    DataView: 'application/octet-stream',
    ReadableStream: 'application/octet-stream',
    URLSearchParams: 'application/x-www-form-urlencoded',
    FormData: 'multipart/form-data',
} as const;

type RequestBodyType = keyof typeof defaultRequestMimeTypes;
type RequestMimeType = (typeof defaultRequestMimeTypes)[RequestBodyType];

function getBodyType(body: RequestBody): RequestBodyType {
    return typeof body === 'string' ? 'string' : body[Symbol.toStringTag];
}

export function getDefaultRequestMimeType(body: RequestBody): RequestMimeType | string | undefined {
    const bodyType = getBodyType(body);
    const defaultMimeType = defaultRequestMimeTypes[bodyType];

    switch (bodyType) {
        case 'Blob':
        case 'File':
            const blob = body as Blob;
            return blob.type || defaultMimeType;

        case 'FormData':
            /**
             * Warning:
             * When using FormData to submit POST requests using XMLHttpRequest
             * or the Fetch_API with the multipart/form-data Content-Type (e.g. when uploading Files and Blobs to the server),
             * do not explicitly set the Content-Type header on the request.
             * Doing so will prevent the browser from being able to set the Content-Type header with the boundary expression
             * it will use to delimit form fields in the request body.
             */
            return undefined;
    }

    return defaultMimeType;
}
