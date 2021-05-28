import { ResponseType, Header } from '../../../types';
import { responseTypes } from '../constants';

/**
 * accepts: 'type/subtype; parameter=value; boundary=somthing'
 * returns: 'type/subtype'
 */
function parseMediaType(value: string | null): string | null {
    return value?.split(';')[0] ?? null;
}

interface Unparsed {
    chunk: string;
    curlyBracesIndexes: number[];
}

class ChunkToJsonParser {
    unparsed: Unparsed;

    constructor() {
        this.unparsed = { chunk: '', curlyBracesIndexes: [] };
    }

    parse(nextChunk: string = '') {
        const chunk = `${this.unparsed.chunk}${nextChunk}`;
        const curlyBracesIndexes = this.unparsed.curlyBracesIndexes;
        const parsedSlices: any[] = [];

        nextChunk.split('').forEach((char, index) => {
            const charIndex = this.unparsed.chunk.length + index;

            switch (char) {
                case '{':
                    curlyBracesIndexes.push(charIndex);
                    break;

                case '}':
                    const openingBraceIndex = curlyBracesIndexes.pop();

                    if (curlyBracesIndexes.length === 0) {
                        const parsedSlice = chunk.slice(openingBraceIndex, charIndex + 1);
                        parsedSlices.push(JSON.parse(parsedSlice));
                    }
                    break;

                default:
            }
        });

        const unparsedChunk = curlyBracesIndexes.length > 0 ? chunk.slice(curlyBracesIndexes[0], chunk.length) : '';
        const parsedChunkLength = chunk.length - unparsedChunk.length;

        this.unparsed = {
            chunk: unparsedChunk,
            curlyBracesIndexes: curlyBracesIndexes.map(curlyBraceIndex => {
                return curlyBraceIndex - parsedChunkLength;
            }),
        };

        return parsedSlices;
    }
}

async function* iterableStream(stream: Body['body'], contentTypeIsJson: boolean) {
    if (!stream) {
        return;
    }

    const reader = stream.getReader();
    const decoder = new TextDecoder();
    const parser = contentTypeIsJson ? new ChunkToJsonParser() : null;

    try {
        let result = await reader.read();

        while (!result.done) {
            const arrayBuffer = result.value;
            const decodedChunk = decoder.decode(arrayBuffer, { stream: true });

            const parsedChunk = parser ? parser.parse(decodedChunk) : decodedChunk;

            if (parsedChunk.length > 0) {
                yield parsedChunk;
            }

            result = await reader.read();
        }
    } catch (e) {
        reader.releaseLock();
        await stream.cancel();
        throw e;
    } finally {
        reader.releaseLock();
    }
}

export type IterableStream = ReturnType<typeof iterableStream>;

const isJsonMediaType = (headers: Headers): boolean => {
    return parseMediaType(headers.get(Header.CONTENT_TYPE)) === responseTypes.json;
};

/**
*  FIXME: Use `Content-Length` header instead

 * By default, it's set responseType to `json`, if it isn't declared otherwise per request.
 * But response body might empty, thus not parsable string to json. However, there's no way to finding out
 * before reading the body, if the body is empty or not.
 */
async function tryToParseAsJson(response: Response): Promise<any | string> {
    const clone = response.clone();
    try {
        if (isJsonMediaType(response.headers)) {
            return await response.json();
        }

        return null;
    } catch (e) {
        if (e.message === 'Unexpected end of JSON input') {
            return await clone.text();
        }
        throw e;
    }
}

export function parseResponse(
    responseType: ResponseType | undefined,
    response: Response,
): Promise<BodyInit> | IterableStream | ReadableStream<Uint8Array> | null {
    switch (responseType) {
        case 'json':
            return tryToParseAsJson(response);

        case 'blob':
            return response.blob();

        case 'formData':
            return response.formData();

        case 'text':
            return response.text();

        case 'arrayBuffer':
            return response.arrayBuffer();

        case 'iterableStream':
            return iterableStream(response.body, isJsonMediaType(response.headers));

        case 'stream':
            return response.body;

        default:
            return null;
    }
}
