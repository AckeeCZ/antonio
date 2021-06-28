import { RequestMethod, RequestConfig, RequestBodyData } from '../../types';

import { interceptors } from '../interceptors/InterceptorManager';
import type { RequestInterceptorsEntries } from '../interceptors/InterceptorManager';
import type { TAntonio } from '../core/models/Antonio';
import { createRequestInit } from './utils';

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

export function* createRequest(
    method: RequestMethod,
    requestUrl: string,
    bodyData: RequestBodyData | undefined,
    requestConfig: RequestConfig | undefined,
    antonio: TAntonio,
) {
    const { url, requestInit, config } = createRequestInit(
        method,
        requestUrl,
        bodyData,
        requestConfig,
        antonio.defaults,
        antonio.generalConfig,
    );

    const requestInterceptors: RequestInterceptorsEntries = interceptors.get(antonio.interceptors.request);
    const request = yield* applyRequestInteceptors(requestInterceptors, url, requestInit, config);

    return { request, config };
}
