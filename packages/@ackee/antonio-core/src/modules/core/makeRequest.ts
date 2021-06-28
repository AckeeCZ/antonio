import { RequestMethod, RequestConfig, RequestBodyData, RequestResult } from '../../types';

import { createRequest } from '../request';
import { processRequest } from '../response';

import type { TAntonio } from './models/Antonio';

export async function generatorToPromise<T>(it: AsyncGenerator<any, T> | Generator<any, T>) {
    let result: IteratorResult<any, T> = await it.next();

    while (true) {
        // if (result.value[Symbol.iterator]) {
        //     throw new SyntaxError(
        //         [
        //             `'resolverType: resolverType.promise' can't have generator function as an interceptor.`,
        //             `Use 'resolverType: resolverType.generator' if you need such an option.`,
        //         ].join('\n'),
        //     );
        // }
        const prevValue = await result.value;
        result = await it.next(prevValue);

        if (result.done) {
            break;
        }
    }

    return result.value;
}

export function* asyncGeneratorToGenerator<T, TReturn, TNext = unknown>(it: AsyncGenerator<T, TReturn, TNext>) {
    let result: IteratorResult<T, TReturn> = yield it.next();

    while (!result.done) {
        const prevValue = yield result.value;
        result = yield it.next(prevValue);
    }

    return result.value;
}

async function* makeRequest<TSuccessData, TErrorData>(
    method: RequestMethod,
    requestUrl: string,
    bodyData: RequestBodyData | undefined,
    requestConfig: RequestConfig | undefined,
    antonio: TAntonio,
) {
    const { request, config } = yield* createRequest(method, requestUrl, bodyData, requestConfig, antonio);

    const result = yield* processRequest<TSuccessData, TErrorData>(request, config, antonio);

    return result;
}

export default function requestTypeResolver<TSuccessData, TErrorData>(
    method: RequestMethod,
    requestUrl: string,
    bodyData: RequestBodyData | undefined,
    requestConfig: RequestConfig | undefined,
    antonio: TAntonio,
) {
    const it = makeRequest<TSuccessData, TErrorData>(method, requestUrl, bodyData, requestConfig, antonio);

    return asyncGeneratorToGenerator<unknown, RequestResult>(it);
}
