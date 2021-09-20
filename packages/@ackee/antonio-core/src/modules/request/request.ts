import type { RequestMethod, RequestConfig, RequestBodyData } from '../../types';

import type { TAntonio } from '../core/models/Antonio';
import { createRequestInit, mergeRequestConfigs } from './utils';

export function* createRequest(
    antonio: TAntonio,
    requestMethod: RequestMethod,
    url: string,
    bodyData: RequestBodyData,
    config?: RequestConfig,
) {
    // @ts-ignore - Property 'interceptors' is protected and only accessible within class 'RequestInterceptorManager' and its subclasses
    const requestInterceptors = antonio.interceptors.request.interceptors;
    let requestParams = { url, config, bodyData };

    for (const [id, requestInterceptor] of requestInterceptors.entries()) {
        if (requestInterceptor.onRequestParams) {
            requestParams = yield requestInterceptor.onRequestParams(requestParams, requestMethod);

            if (!requestParams || !('bodyData' in requestParams) || !requestParams.url) {
                throw new TypeError(
                    // eslint-disable-next-line max-len
                    `An onRequestParams method of request interceptor with id '${id}' must return object with shape of '{ url: string; config?: RequestConfig; bodyData: RequestBodyData; }'.\nReceived: ${JSON.stringify(
                        requestParams,
                        null,
                        2,
                    )}`,
                );
            }
        }
    }

    const mergedConfig = mergeRequestConfigs(antonio.defaults, requestParams.config);

    const { requestUrl, requestInit } = createRequestInit(
        requestMethod,
        {
            ...requestParams,
            config: mergedConfig,
        },
        antonio.generalConfig,
    );
    let request = new Request(requestUrl, requestInit);

    for (const [id, requestInterceptor] of requestInterceptors.entries()) {
        if (requestInterceptor.onRequest) {
            request = yield requestInterceptor.onRequest(request);

            if (!(request instanceof Request)) {
                throw new TypeError(
                    // eslint-disable-next-line max-len
                    `An onRequest method of interceptor with id '${id}' must return an instance of Request.\nReceived: ${JSON.stringify(
                        request,
                        null,
                        2,
                    )}`,
                );
            }
        }
    }

    return {
        request,
        requestParams,
        config: mergedConfig,
    };
}
