interface OnProgress<T> {
    (value: T): Generator<T, void, any>;
}

/**
 * Converts async generator to sync generator.
 * Use it to handle `iterableStream` response data type.
 *
 * @example
 * ```ts
 * import { runIterableStream } from `@ackee/antonio-core`;
 *
 * function* fetchPosts() {
 *   const { data } = yield* api.get('/posts', {
 *       responseDataType: 'iterableStream',
 *   });
 *
 *   yield runIterableStream(data, function*(slice) {
 *      console.log(slice) // -> [{ title: '1' }, { title: '2' }, ...]
 *   });
 *  }
 * ```
 */
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
