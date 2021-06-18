import ChunkToJsonParser from './parsers/ChunkToJsonParser';

export async function* iterableStream(stream: Body['body'], contentTypeIsJson: boolean) {
    if (!stream) {
        return;
    }

    const reader = stream.getReader();

    try {
        const decoder = new TextDecoder();
        const parser = contentTypeIsJson ? new ChunkToJsonParser() : null;
        let result = await reader.read();
        let yieldedSome = false;
        let parsedChunk: string | any[] | undefined;

        while (!result.done) {
            const arrayBuffer = result.value;
            const decodedChunk = decoder.decode(arrayBuffer, { stream: true });

            parsedChunk = parser ? parser.parse(decodedChunk) : decodedChunk;

            if (parsedChunk.length > 0) {
                yield parsedChunk;
                yieldedSome = true;
            }

            result = await reader.read();
        }

        // If every chunk was empty, yield now, at the end, the empty chunk as the last value.
        // Otherwise the generator wouldn't ever end.
        if (!yieldedSome) {
            yield parsedChunk;
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
