import { formatBodyData } from '../formatBodyData';

describe('formatBodyData', () => {
    it('returns undefined for null or undefined', () => {
        expect(formatBodyData(undefined)).toBe(undefined);
        expect(formatBodyData(null)).toBe(undefined);
    });

    it('returns string for strigifable data', () => {
        expect(formatBodyData(1)).toBe('1');
        expect(formatBodyData(true)).toBe('true');
        expect(formatBodyData({ a: 1 })).toBe('{"a":1}');
        expect(formatBodyData([1, 2])).toBe('[1,2]');
    });

    it('converts BigInt to string', () => {
        expect(formatBodyData(BigInt('1'))).toBe('1');
    });

    it('returns data as it is', () => {
        expect(formatBodyData(new Blob(['']))).toBeInstanceOf(Blob);
        expect(formatBodyData(new File([''], 'filename'))).toBeInstanceOf(File);
        expect(formatBodyData(new FormData())).toBeInstanceOf(FormData);
        expect(formatBodyData(new URLSearchParams())).toBeInstanceOf(URLSearchParams);
        expect(formatBodyData(new ArrayBuffer(1))).toBeInstanceOf(ArrayBuffer);
    });
});
