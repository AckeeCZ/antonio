import { RequestMethod, RequestConfig, GeneralConfig, RequestResult } from '../../types';

import { resolverTypes } from './constants';
import { interceptors } from './models/InterceptorManager';
import type { RequestInterceptorsEntries, ResponseInterceptorsEntries } from './models/InterceptorManager';
import { generalConfigs } from './general-config';
import type { TAntonio } from './models/Antonio';
import { AntonioError } from './errors';
import { createRequestInit, parseResponse } from './utils';
import { DefaultRequestConfig } from './request-config';

function* applyRequestInteceptors(
    requestInterceptors: RequestInterceptorsEntries,
    url: string,
    requestInit: RequestInit,
    config: RequestConfig,
) {
    try {
        let request = new Request(url, requestInit);

        for (const [id, requestInterceptor] of requestInterceptors.entries()) {
            if (requestInterceptor.onFulfilled) {
                request = yield requestInterceptor.onFulfilled(request, config);

                if (!(request instanceof Request)) {
                    throw new TypeError(
                        // eslint-disable-next-line max-len
                        `An 'onFulfilled' callback of a request interceptor with id '${id}' must return a Request instance. Received ${JSON.stringify(
                            request,
                        )}`,
                    );
                }
            }
        }

        return request;
    } catch (e) {
        for (const requestInterceptor of requestInterceptors.values()) {
            if (requestInterceptor.onRejected) {
                yield requestInterceptor.onRejected(e, config);
            }
        }
        throw e;
    }
}

async function* applyResponseInterceptors(
    responseInterceptors: ResponseInterceptorsEntries,
    request: Request,
    config: DefaultRequestConfig,
) {
    try {
        let response = await fetch(request);

        for (const [id, responseInterceptor] of responseInterceptors.entries()) {
            if (responseInterceptor.onFulfilled) {
                response = yield responseInterceptor.onFulfilled(response, config);

                if (!(response instanceof Response)) {
                    throw new TypeError(
                        // eslint-disable-next-line max-len
                        `An 'onFulfilled' callback of a response interceptor with id '${id}' must return a Response instance. Received ${JSON.stringify(
                            response,
                        )}`,
                    );
                }
            }
        }

        const data = await parseResponse(config.responseType, response);

        if (!response.ok) {
            throw new AntonioError(request, response, data);
        }

        return {
            data,
            response,
        };
    } catch (e) {
        for (const responseInterceptor of responseInterceptors.values()) {
            if (responseInterceptor.onRejected) {
                yield responseInterceptor.onRejected(e, config);
            }
        }
        throw e;
    }
}

async function* request(
    method: RequestMethod,
    requestUrl: string,
    body: BodyInit | undefined,
    requestConfig: RequestConfig | undefined,
    antonio: TAntonio,
    generalConfig: GeneralConfig,
) {
    const { url, requestInit, config } = createRequestInit(
        method,
        requestUrl,
        body,
        requestConfig,
        antonio.defaults,
        generalConfig,
    );

    const requestInterceptors: RequestInterceptorsEntries = interceptors.get(antonio.interceptors.request);
    const request = yield* applyRequestInteceptors(requestInterceptors, url, requestInit, config);

    const responseInterceptors: ResponseInterceptorsEntries = interceptors.get(antonio.interceptors.response);
    const { response, data } = yield* applyResponseInterceptors(responseInterceptors, request, config);

    const result = {
        request,
        response,
        data,
        status: response.status,
        statusText: response.statusText,
        config,
        headers: Object.fromEntries(response.headers.entries()),
    };

    return result;
}

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

function* asyncGeneratorToGenerator<T>(it: ReturnType<typeof request>): Generator<any, T, any> {
    let result: IteratorResult<any, T> = yield it.next();

    while (!result.done) {
        const prevValue = yield result.value;
        result = yield it.next(prevValue);
    }

    return result.value;
}

export default function requestTypeResolver(
    method: RequestMethod,
    requestUrl: string,
    body: BodyInit | undefined,
    requestConfig: RequestConfig | undefined,
    antonio: TAntonio,
) {
    const generalConfig = generalConfigs.get(antonio);

    if (!generalConfig) {
        throw new Error(
            `'requestTypeResolver' can't be called before settings generalConfig for a given Antonio instance.`,
        );
    }

    const it = request(method, requestUrl, body, requestConfig, antonio, generalConfig);

    switch (generalConfig.resolverType) {
        case resolverTypes.GENERATOR:
            return asyncGeneratorToGenerator<RequestResult>(it);

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
