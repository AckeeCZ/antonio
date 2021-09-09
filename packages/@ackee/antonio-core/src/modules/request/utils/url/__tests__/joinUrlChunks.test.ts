import { joinUrlChunks } from '..';

describe('joinUrlChunks', () => {
    it('joins multiple pathnames with origin to create one URL', () => {
        expect(joinUrlChunks('https://example.com/', '/a', 'b').toString()).toBe('https://example.com/a/b');
        expect(joinUrlChunks('https://example.com', 'a').toString()).toBe('https://example.com/a');
        expect(joinUrlChunks('https://example.com/')).toBeInstanceOf(URL);
    });
});
