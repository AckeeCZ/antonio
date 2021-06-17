interface Unparsed {
    chunk: string;
    curlyBracesIndexes: number[];
}

export default class ChunkToJsonParser {
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
