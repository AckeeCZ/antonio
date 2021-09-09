import logger from 'loglevel';
import { createRequestUrl } from '..';

describe('createRequestUrl', () => {
    it('composes request url', () => {
        const url = createRequestUrl(
            '/user/:id',
            {
                baseURL: 'https://example.com',
                uriParams: {
                    id: '2',
                },
                params: new URLSearchParams({
                    page: '1',
                }),
                headers: {},
            },
            {
                logger,
            },
        );

        expect(url).toBe('https://example.com/user/2?page=1');
    });
});
