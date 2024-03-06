import Headers from 'fetch-headers';
import { mergeHeaders, mergeRequestConfigs } from '../mergeRequestConfigs';

describe('mergeHeaders', () => {
    it('returns empty headers if no args are provided', () => {
        expect(mergeHeaders()).toBeInstanceOf(Headers);
        expect([...mergeHeaders().keys()]).toHaveLength(0);
    });

    it('merges object with nothing', () => {
        const headersA = { a: 'foo' };
        const headersB = undefined;

        expect(mergeHeaders(headersA, headersB).get('a')).toBe('foo');
        expect([...mergeHeaders(headersA, headersB).entries()]).toHaveLength(1);
    });

    it('merges object with object', () => {
        const headersA = { a: 'foo' };
        const headersB = { a: 'bar' };

        expect(mergeHeaders(headersA, headersB).get('a')).toBe('bar');
        expect([...mergeHeaders(headersA, headersB).entries()]).toHaveLength(1);
    });

    it('merges object with headers', () => {
        const headersA = { a: 'foo' };
        const headersB = new Headers({ a: 'bar' });

        expect(mergeHeaders(headersA, headersB).get('a')).toBe('bar');
        expect([...mergeHeaders(headersA, headersB).entries()]).toHaveLength(1);
    });

    it('merges headers with headers', () => {
        const headersA = new Headers({ a: 'foo' });
        const headersB = new Headers({ a: 'bar' });

        expect(mergeHeaders(headersA, headersB).get('a')).toBe('bar');
        expect(headersA.get('a')).toBe('foo');
        expect(headersB.get('a')).toBe('bar');
        expect([...mergeHeaders(headersA, headersB).entries()]).toHaveLength(1);
    });

    it('merges headers with different headers', () => {
        const headersA = new Headers({ a: 'foo' });
        const headersB = new Headers({ b: 'bar' });

        expect(mergeHeaders(headersA, headersB).get('a')).toBe('foo');
        expect(mergeHeaders(headersA, headersB).get('b')).toBe('bar');
        expect(headersA.get('a')).toBe('foo');
        expect(headersB.get('b')).toBe('bar');
        expect([...mergeHeaders(headersA, headersB).entries()]).toHaveLength(2);
    });
});

describe('mergeRequestConfigs', () => {
    let configA;

    beforeEach(() => {
        configA = {
            headers: new Headers(),
        };
    });

    it('merges uri params', () => {
        const configB = {
            uriParams: { id: '1' },
        };

        expect(mergeRequestConfigs(configA, configB)).toHaveProperty('uriParams');
        expect(mergeRequestConfigs(configA, configB).uriParams).toHaveProperty('id');
        expect(mergeRequestConfigs(configA, configB).uriParams?.id).toBe('1');
    });

    it('merges params (object with object)', () => {
        // before each creates a new instance of configA object,
        // so this mutation is fine
        configA.params = {
            foo: 'bar',
            page: 2,
            items: [4, 5, 6],
        };
        const configB = {
            params: {
                page: 1,
                limit: 20,
                items: [1, 2, 3],
            },
        };

        const params = mergeRequestConfigs(configA, configB).params as URLSearchParams;

        expect(mergeRequestConfigs(configA, configB)).toHaveProperty('params');
        expect(configA).toHaveProperty('params');
        expect(configA.params.page).toBe(2);
        expect(configA.params.items).toEqual([4, 5, 6]);
        expect(configB).toHaveProperty('params');
        expect(params.get('page')).toBe('1');
        expect(params.get('limit')).toBe('20');
        expect(params.get('foo')).toBe('bar');
        expect(params.getAll('items')).toEqual(['1', '2', '3']);
    });

    it('merges params (URLSearchParams with object)', () => {
        configA.params = {
            foo: 'bar',
            page: 2,
        };
        const configB = {
            params: new URLSearchParams({
                page: '1',
                limit: '20',
            }),
        };

        const params = mergeRequestConfigs(configA, configB).params as URLSearchParams;

        expect(mergeRequestConfigs(configA, configB)).toHaveProperty('params');
        expect(configA).toHaveProperty('params');
        expect(configA.params.page).toBe(2);
        expect(configB).toHaveProperty('params');
        expect(params.get('page')).toBe('1');
        expect(params.get('limit')).toBe('20');
    });

    it('merges params (object with undefined)', () => {
        configA.params = {
            page: 2,
        };
        const configB = undefined;
        const configC = mergeRequestConfigs(configA, configB);

        expect(configC.params).toBeInstanceOf(URLSearchParams);
        expect(configC.params?.get('page')).toBe('2');
    });
});
