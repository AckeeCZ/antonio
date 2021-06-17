import { parseContentTypeHeader, parseMimeTypes } from '.';

describe('response/utils', () => {
    it('parses media-type value from content type header', () => {
        expect(parseContentTypeHeader('text/html')).toEqual('text/html');

        expect(parseContentTypeHeader('text/html; charset=UTF-8')).toEqual('text/html');
        expect(parseContentTypeHeader('text/html;charset=UTF-8')).toEqual('text/html');

        expect(parseContentTypeHeader('text/html;charset=UTF-8;boundary=something')).toEqual('text/html');
        expect(parseContentTypeHeader('text/html; charset=UTF-8; boundary=something')).toEqual('text/html');

        expect(
            parseContentTypeHeader(
                'audio/1d-interleaved-parityfec,audio/32kadpcm,audio/3gpp; charset=something; boundary=something',
            ),
        ).toEqual('audio/1d-interleaved-parityfec,audio/32kadpcm,audio/3gpp');
    });

    it('get array of mime-types from parsed mime-type string', () => {
        expect(parseMimeTypes('audio/1d-interleaved-parityfec, audio/32kadpcm, audio/3gpp')).toEqual([
            'audio/1d-interleaved-parityfec',
            'audio/32kadpcm',
            'audio/3gpp',
        ]);
        expect(parseMimeTypes('audio/1d-interleaved-parityfec,audio/32kadpcm,audio/3gpp')).toEqual([
            'audio/1d-interleaved-parityfec',
            'audio/32kadpcm',
            'audio/3gpp',
        ]);
    });
});
