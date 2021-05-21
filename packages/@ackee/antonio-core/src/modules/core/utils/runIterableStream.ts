interface OnProgress<T> {
    (value: T): Generator<T, void, any>;
}

export function* runIterableStream<T = string | any[]>(
    it: AsyncGenerator<T, void, unknown>,
    onProgress: OnProgress<T>,
) {
    while (true) {
        const { done, value } = yield it.next();

        if (done) {
            break;
        }

        yield* onProgress(value);
    }
}
