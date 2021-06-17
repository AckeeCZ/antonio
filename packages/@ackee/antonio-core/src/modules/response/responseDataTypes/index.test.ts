/* eslint-disable compat/compat */
import { getResponseDataType } from '.';

describe('response', () => {
    describe('getResponseDataType', () => {
        let headers: Headers;

        beforeEach(() => {
            headers = new Headers();
        });

        it(`returns 'text' method for 'text/html' content type`, () => {
            headers.append('Content-Type', 'text/html');
            expect(getResponseDataType(headers.get('Content-Type'))).toBe('text');
        });

        it(`returns 'json' method for 'application/json' content type`, () => {
            headers.append('Content-Type', 'application/json');
            expect(getResponseDataType(headers.get('Content-Type'))).toBe('json');
        });

        it.each(['image/*', 'audio/*', 'video/*', 'image/jpeg', 'image/svg+xml', 'application/octet-stream'])(
            `returns 'arrayBuffer for '%s' content type`,
            contentType => {
                headers.append('Content-Type', contentType);
                expect(getResponseDataType(headers.get('Content-Type'))).toBe('arrayBuffer');
                headers.delete('Content-Type');
            },
        );

        it.each(['multipart/form-data'])(`returns 'formData for '%s' content type`, contentType => {
            headers.append('Content-Type', contentType);
            expect(getResponseDataType(headers.get('Content-Type'))).toBe('formData');
            headers.delete('Content-Type');
        });

        it(`returns 'null' for unexisting content type`, () => {
            expect(getResponseDataType(null)).toBe(null);
        });

        it(`returns 'null' for unexisting content type`, () => {
            headers.append('Content-Type', 'text/html');
            headers.append('Content-Type', 'image/*');

            expect(getResponseDataType(headers.get('Content-Type'))).toBe(null);
        });
    });
});
