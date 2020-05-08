import { ResponseType, Header, ResponseTypes } from '../constants';

function parseHeaderValue(headerValue = '') {
    return headerValue
        .split(';')
        .map(str => str.trim())
        .filter(str => str.length > 0);
}

export function parseResponse(responseType, response) {
    switch (responseType) {
        case ResponseType.JSON: {
            const contentType = response.headers.get(Header.CONTENT_TYPE);
            const hasJsonResponseType = parseHeaderValue(contentType).includes(ResponseTypes[ResponseType.JSON]);

            return hasJsonResponseType ? response.json() : null;
        }

        case ResponseType.BLOB:
            return response.blob();

        case ResponseType.FORM_DATA:
            return response.formData();

        case ResponseType.TEXT:
            return response.text();

        default:
            return null;
    }
}
