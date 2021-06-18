interface OnProgress<T> {
    (value: T): Generator<T, void, any>;
}

export function* runIterableStream<T = string | any[]>(
    it: AsyncGenerator<T, void, unknown>,
    onProgress: OnProgress<T>,
) {
    if (!it[Symbol.asyncIterator]) {
        throw new TypeError(
            `The 1st arg must be async generator. Check you have set the 'responseDataType' to 'iterableStream'.`,
        );
    }

    while (true) {
        const { done, value } = yield it.next();

        if (done) {
            break;
        }

        yield* onProgress(value);
    }
}
