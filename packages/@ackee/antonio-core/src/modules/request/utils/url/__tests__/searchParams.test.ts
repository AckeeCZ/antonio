import { getValidSearchParams, encodeParamsToSearchParams } from '../searchParams';

describe('getValidSearchParams', () => {
    it('returns params without null, undefined or empty string', () => {
        const params = new URLSearchParams({
            a: 'null',
            b: 'undefined',
            c: '',
            d: 'foo',
        });

        const validParams = getValidSearchParams(params);

        expect(validParams.has('d')).toBe(true);
        expect(Array.from(validParams.entries()).length).toBe(1);
    });
});

describe.only('encodeParamsToSearchParams', () => {
    it(`returns undefined if undefined params received`, () => {
        expect(encodeParamsToSearchParams()).toBe(undefined);
    });

    it(`returns received params if they're instace of URLSearchParams`, () => {
        const params = new URLSearchParams();
        expect(encodeParamsToSearchParams(params)).toBe(params);
    });

    // TODO:
    it.skip(`encodes object literal to an instance of URLSearchParams`, () => {
        const params = {
            a: 1,
            b: ['a', 'b'],
            c: 'foo',
        };

        // TODO: continue here
        // const result = encodeParamsToSearchParams(params);
    });
});
