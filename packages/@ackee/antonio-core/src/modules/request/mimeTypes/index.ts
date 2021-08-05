import type { RequestBody } from '../../../types';

const defaultRequestMimeTypes = {
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
type RequestMimeType = typeof defaultRequestMimeTypes[RequestBodyType];

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
            // Detect mime-type from the 1st form data value
            const formData = body as FormData;
            const firstItem = formData.values().next().value;
            return getDefaultRequestMimeType(firstItem);
    }

    return defaultMimeType;
}
