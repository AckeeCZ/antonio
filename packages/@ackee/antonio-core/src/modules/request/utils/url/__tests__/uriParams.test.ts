import { setUriParams } from '../uriParams';

describe('uriParams', () => {
    it('replaces :id token with actual value', () => {
        const url = setUriParams('/users/:group/:id', {
            id: 1,
            group: 'alpha',
        });

        expect(url).toEqual('/users/alpha/1');
    });

    it(`throws an error if value for given token isn't provided`, () => {
        expect(() => setUriParams('/users/:id', {})).toThrow(TypeError);
    });
});
