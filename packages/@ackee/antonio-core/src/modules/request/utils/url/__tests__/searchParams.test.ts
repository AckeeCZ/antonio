import { encodeParamsToSearchParams } from '../searchParams';

describe('encodeParamsToSearchParams', () => {
    it(`returns undefined if undefined params received`, () => {
        expect(encodeParamsToSearchParams()).toBeInstanceOf(URLSearchParams);
    });

    it(`returns received params if they're instace of URLSearchParams`, () => {
        const params = new URLSearchParams();
        expect(encodeParamsToSearchParams(params)).toBe(params);
    });

    it(`encodes object literal to an instance of URLSearchParams`, () => {
        const params = {
            a: 1,
            b: [1, 2],
            c: 'foo',
            d: true,
        };

        const result = encodeParamsToSearchParams(params);

        expect(result.get('a')).toBe('1');
        expect(result.getAll('b')).toEqual(['1', '2']);
        expect(result.get('c')).toBe('foo');
        expect(result.get('d')).toBe('true');
    });
});
