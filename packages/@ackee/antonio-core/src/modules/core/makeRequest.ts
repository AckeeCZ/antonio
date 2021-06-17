import { RequestMethod, RequestConfig, RequestResult, RequestBodyData } from '../../types';

import { createRequest } from '../request';
import { processRequest } from '../response';

import { resolverTypes } from './constants';
import { generalConfigs } from './general-config';
import type { GeneralConfig } from './general-config';
import type { TAntonio } from './models/Antonio';

async function asyncGeneratorToPromise<T>(it: AsyncGenerator<any, T>) {
    let result: IteratorResult<any, T> = await it.next();

    while (!result.done) {
        if (result.value[Symbol.iterator]) {
            throw new SyntaxError(
                [
                    `'resolverType: resolverType.promise' can't have generator function as an interceptor.`,
                    `Use 'resolverType: resolverType.generator' if you need such an option.`,
                ].join('\n'),
            );
        }
        const prevValue = result.value;
        result = await it.next(prevValue);
    }

    return result.value;
}

function* asyncGeneratorToGenerator<T, TReturn, TNext = unknown>(it: AsyncGenerator<T, TReturn, TNext>) {
    let result: IteratorResult<T, TReturn> = yield it.next();

    while (!result.done) {
        const prevValue = yield result.value;
        result = yield it.next(prevValue);
    }

    return result.value;
}

async function* makeRequest(
    method: RequestMethod,
    requestUrl: string,
    bodyData: RequestBodyData | undefined,
    requestConfig: RequestConfig | undefined,
    antonio: TAntonio,
    generalConfig: GeneralConfig,
) {
    const { request, config } = yield* createRequest(
        method,
        requestUrl,
        bodyData,
        requestConfig,
        antonio,
        generalConfig,
    );

    const result = yield* processRequest(request, config, antonio);

    return result;
}

export default function requestTypeResolver(
    method: RequestMethod,
    requestUrl: string,
    bodyData: RequestBodyData | undefined,
    requestConfig: RequestConfig | undefined,
    antonio: TAntonio,
) {
    const generalConfig = generalConfigs.get(antonio);

    if (!generalConfig) {
        throw new Error(
            `'requestTypeResolver' can't be called before settings generalConfig for a given Antonio instance.`,
        );
    }

    const it = makeRequest(method, requestUrl, bodyData, requestConfig, antonio, generalConfig);

    switch (generalConfig.resolverType) {
        case resolverTypes.GENERATOR:
            return asyncGeneratorToGenerator<unknown, RequestResult>(it);

        case resolverTypes.PROMISE:
            return asyncGeneratorToPromise<RequestResult>(it);

        default:
            throw new TypeError(
                `'resolverType' must be one of: ${Object.values(resolverTypes).join(', ')}. Received: '${
                    generalConfig.resolverType
                }'`,
            );
    }
}
