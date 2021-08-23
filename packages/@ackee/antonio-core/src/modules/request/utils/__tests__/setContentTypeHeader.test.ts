import Headers from 'fetch-headers';
import { setContentTypeHeader } from '../request';

describe('setContentTypeHeader', () => {
    it(`doesn't overwrite existing content type header`, () => {
        const contentType = 'my-content-type';

        expect(
            setContentTypeHeader('GET', {
                headers: new Headers({
                    'Content-Type': contentType,
                }),
            }).get('Content-Type'),
        ).toBe(contentType);

        expect(
            setContentTypeHeader(
                'POST',
                {
                    headers: new Headers({
                        'Content-Type': contentType,
                    }),
                },
                'body content',
            ).get('Content-Type'),
        ).toBe(contentType);

        expect(
            setContentTypeHeader(
                'PUT',
                {
                    headers: new Headers({
                        'Content-Type': contentType,
                    }),
                },
                'body content',
            ).get('Content-Type'),
        ).toBe(contentType);

        expect(
            setContentTypeHeader(
                'PATCH',
                {
                    headers: new Headers({
                        'Content-Type': contentType,
                    }),
                },
                'body content',
            ).get('Content-Type'),
        ).toBe(contentType);
    });

    it(`doesn't set content type for HEAD method`, () => {
        const config = {
            headers: new Headers(),
        };
        expect(setContentTypeHeader('HEAD', config).has('Content-Type')).toBe(false);
    });

    it(`doesn't set content type if request hasn't got 'body'`, () => {
        const config = {
            headers: new Headers(),
        };
        expect(setContentTypeHeader('POST', config).has('Content-Type')).toBe(false);
    });

    it(`sets content type if request has got 'body'`, () => {
        expect(setContentTypeHeader('POST', { headers: new Headers() }, 'body content').has('Content-Type')).toBe(true);
        expect(setContentTypeHeader('PUT', { headers: new Headers() }, 'body content').has('Content-Type')).toBe(true);
        expect(setContentTypeHeader('PATCH', { headers: new Headers() }, 'body content').has('Content-Type')).toBe(
            true,
        );
    });
});
