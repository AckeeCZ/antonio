import { mergeParams } from '../mergeRequestConfigs';

describe.only('mergeParams', () => {
    it(`does't loose multiple entries with identical keys`, () => {
        const paramsA = new URLSearchParams([
            ['issuedOn', 'foo1'],
            ['issuedOn', 'foo2'],
        ]);
        const paramsB = new URLSearchParams();

        expect(mergeParams(paramsA, paramsB).getAll('issuedOn')).toHaveLength(2);
        expect(mergeParams(paramsA, paramsB).getAll('issuedOn')).toEqual(['foo1', 'foo2']);
    });

    it(`overrides 'issuedOn' from 'paramsA' by 'issuedOn' from 'paramsB'`, () => {
        const paramsA = new URLSearchParams([
            ['issuedOn', 'foo1'],
            ['issuedOn', 'foo2'],
        ]);
        const paramsB = new URLSearchParams([
            ['issuedOn', 'bar1'],
            ['issuedOn', 'bar2'],
        ]);

        expect(mergeParams(paramsA, paramsB).getAll('issuedOn')).toHaveLength(2);
        expect(mergeParams(paramsA, paramsB).getAll('issuedOn')).toEqual(['bar1', 'bar2']);
    });
});
