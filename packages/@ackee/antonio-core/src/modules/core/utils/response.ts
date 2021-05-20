import { ResponseType, Header, ResponseTypes } from '../../../types';

function parseHeaderValue(headerValue: string | null): string[] {
    if (!headerValue) {
        return [];
    }

    return headerValue
        .split(';')
        .map(str => str.trim())
        .filter(str => str.length > 0);
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

            yield parser ? parser.parse(decodedChunk) : decodedChunk;

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

const isJsonContentType = (headers: Headers): boolean => {
    const contentType = headers.get(Header.CONTENT_TYPE);
    return parseHeaderValue(contentType).includes(ResponseTypes.json);
};

export function parseResponse(
    responseType: ResponseType | undefined,
    response: Response,
): Promise<BodyInit> | IterableStream | ReadableStream<Uint8Array> | null {
    switch (responseType) {
        case 'json':
            return isJsonContentType(response.headers) ? response.json() : null;

        case 'blob':
            return response.blob();

        case 'formData':
            return response.formData();

        case 'text':
            return response.text();

        case 'arrayBuffer':
            return response.arrayBuffer();

        case 'iterableStream':
            return iterableStream(response.body, isJsonContentType(response.headers));

        case 'stream':
            return response.body;

        default:
            return null;
    }
}
