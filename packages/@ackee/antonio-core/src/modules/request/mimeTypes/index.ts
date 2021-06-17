import type { RequestBody } from '../../../types';

// TODO: a possible improvement in precision of conveying document type:
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types#other_methods_of_conveying_document_type
const defaultRequestMimeTypes = {
    string: 'application/json',
    Blob: 'application/octet-stream',
    ArrayBuffer: 'application/octet-stream',
    DataView: 'application/octet-stream',
    ReadableStream: 'application/octet-stream',
    URLSearchParams: 'application/x-www-form-urlencoded',
    FormData: 'multipart/form-data',
    any: '*/*',
} as const;

type RequestBodyType = keyof typeof defaultRequestMimeTypes;
type RequestMimeType = typeof defaultRequestMimeTypes[RequestBodyType];

function getBodyType(body: RequestBody): RequestBodyType {
    return typeof body === 'string' ? 'string' : body[Symbol.toStringTag];
}

export function getDefaultRequestMimeType(body: RequestBody): RequestMimeType {
    const bodyType = getBodyType(body);
    return defaultRequestMimeTypes[bodyType] || defaultRequestMimeTypes.any;
}
