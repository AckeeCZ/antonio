import { RequestMethod, RequestConfig, RequestBodyData, RequestResult } from '../../types';

import { createRequest } from '../request';
import { processRequest } from '../response';

// import { resolverTypes } from './constants';
import { generalConfigs } from './general-config';
import type { GeneralConfig } from './general-config';
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

function* asyncGeneratorToGenerator<T, TReturn, TNext = unknown>(it: AsyncGenerator<T, TReturn, TNext>) {
    let result: IteratorResult<T, TReturn> = yield it.next();

    while (!result.done) {
        const prevValue = yield result.value;
        result = yield it.next(prevValue);
    }

    return result.value;
}

async function* makeRequest<D>(
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

    return result as unknown as RequestResult<D>;
}

export default function requestTypeResolver<D>(
    method: RequestMethod,
    requestUrl: string,
    bodyData: RequestBodyData | undefined,
    requestConfig: RequestConfig | undefined,
    antonio: TAntonio,
) {
    const generalConfig = generalConfigs.get(antonio) as GeneralConfig;

    const it = makeRequest<D>(method, requestUrl, bodyData, requestConfig, antonio, generalConfig);

    // NOTE: disable it until I'll figure out how to do dynamic return type
    // – i.e. how to change based on constant option.
    // switch (generalConfig.resolverType) {
    // case resolverTypes.GENERATOR:
    return asyncGeneratorToGenerator<unknown, RequestResult<D>>(it);

    // case resolverTypes.PROMISE:
    // return asyncGeneratorToPromise<RequestResult>(it);

    //     default:
    //         throw new TypeError(
    //             `'resolverType' must be one of: ${Object.values(resolverTypes).join(', ')}. Received: '${
    //                 generalConfig.resolverType
    //             }'`,
    //         );
    // }
}
