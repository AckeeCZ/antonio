import ChunkToJsonParser from './parsers/ChunkToJsonParser';

export async function* iterableStream(stream: Body['body'], contentTypeIsJson: boolean) {
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
