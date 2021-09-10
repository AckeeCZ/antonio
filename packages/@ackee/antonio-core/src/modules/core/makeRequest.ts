import { RequestMethod, RequestConfig, RequestBodyData, RequestResult } from '../../types';

import { createRequest } from '../request';
import { processRequest } from '../response';

import type { TAntonio } from './models/Antonio';

export async function generatorToPromise<T>(it: AsyncGenerator<any, T> | Generator<any, T>) {
    let result: IteratorResult<any, T> = await it.next();

    while (true) {
        const prevValue = await result.value;
        result = await it.next(prevValue);

        if (result.done) {
            break;
        }
    }

    return result.value;
}

export function* asyncGeneratorToGenerator<T, TReturn = any, TNext = unknown>(it: AsyncGenerator<T, TReturn, TNext>) {
    let result: IteratorResult<T, TReturn> = yield it.next();

    while (!result.done) {
        const prevValue = yield result.value;
        result = yield it.next(prevValue);
    }

    return result.value;
}

async function* makeRequest<TSuccessData, TErrorData>(
    antonio: TAntonio,
    method: RequestMethod,
    requestUrl: string,
    bodyData: RequestBodyData,
    requestConfig?: RequestConfig,
) {
    const { request, config, requestParams } = yield* createRequest(
        antonio,
        method,
        requestUrl,
        bodyData,
        requestConfig,
    );

    const result = yield* processRequest<TSuccessData, TErrorData>(antonio, request, requestParams, config);

    return result;
}

export default function requestTypeResolver<TSuccessData, TErrorData>(
    antonio: TAntonio,
    method: RequestMethod,
    requestUrl: string,
    bodyData: RequestBodyData,
    requestConfig?: RequestConfig,
) {
    const it = makeRequest<TSuccessData, TErrorData>(antonio, method, requestUrl, bodyData, requestConfig);

    return asyncGeneratorToGenerator<unknown, RequestResult<TSuccessData>>(it);
}
