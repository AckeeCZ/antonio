import { getDefaultRequestMimeType, defaultRequestMimeTypes } from '.';

describe('Request mime types', () => {
    it(`gets blob's custom type`, () => {
        const mimeType = 'some_crazy_mime_type';
        const blob = new Blob([''], {
            type: mimeType,
        });
        expect(getDefaultRequestMimeType(blob)).toBe(mimeType);
    });

    it(`gets file's custom type`, () => {
        const mimeType = 'some_crazy_mime_type';
        const file = new File([''], 'file-name', {
            type: mimeType,
        });
        expect(getDefaultRequestMimeType(file)).toBe(mimeType);
    });

    it(`gets blob's default type`, () => {
        const blob = new Blob(['']);
        expect(getDefaultRequestMimeType(blob)).toBe(defaultRequestMimeTypes.Blob);
    });

    it(`gets file's default type`, () => {
        const file = new File([''], 'file');
        expect(getDefaultRequestMimeType(file)).toBe(defaultRequestMimeTypes.File);
    });

    it(`gets string's default type`, () => {
        expect(getDefaultRequestMimeType('')).toBe(defaultRequestMimeTypes.string);
    });

    it(`gets URLSearchParams' default type`, () => {
        expect(getDefaultRequestMimeType(new URLSearchParams())).toBe(defaultRequestMimeTypes.URLSearchParams);
    });

    it(`gets FormData' default type`, () => {
        expect(getDefaultRequestMimeType(new FormData())).toBe(undefined);
    });

    it(`gets ArrayBuffer's default type`, () => {
        expect(getDefaultRequestMimeType(new ArrayBuffer(1))).toBe(defaultRequestMimeTypes.ArrayBuffer);
    });
});
