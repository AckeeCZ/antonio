import { ResponseType, Header, ResponseTypes } from '../constants';

function parseHeaderValue(headerValue: string | null): string[] {
    if (!headerValue) {
        return [];
    }

    return headerValue
        .split(';')
        .map(str => str.trim())
        .filter(str => str.length > 0);
}

export function parseResponse(responseType: ResponseType | undefined, response: Response): Promise<BodyInit> | null {
    switch (responseType) {
        case 'json': {
            const contentType = response.headers.get(Header.CONTENT_TYPE);
            const hasJsonResponseType = parseHeaderValue(contentType).includes(ResponseTypes.json);

            return hasJsonResponseType ? response.json() : null;
        }

        case 'blob':
            return response.blob();

        case 'formData':
            return response.formData();

        case 'text':
            return response.text();

        default:
            return null;
    }
}
