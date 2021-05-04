import { RequestMethod, RequestConfig, GeneralConfig } from 'types';

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
) {
    try {
        let request = new Request(url, requestInit);

        for (const [id, requestInterceptor] of requestInterceptors.entries()) {
            if (requestInterceptor.onFulfilled) {
                request = yield requestInterceptor.onFulfilled(request);

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
                yield requestInterceptor.onRejected(e);
            }
        }
        throw e;
    }
}

function* applyResponseInterceptors(
    responseInterceptors: ResponseInterceptorsEntries,
    request: Request,
    config: DefaultRequestConfig,
) {
    try {
        let response: Response = yield fetch(request);

        for (const [id, responseInterceptor] of responseInterceptors.entries()) {
            if (responseInterceptor.onFulfilled) {
                response = yield responseInterceptor.onFulfilled(response);

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

        const data: BodyInit | null = yield parseResponse(config.responseType, response);

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
                yield responseInterceptor.onRejected(e);
            }
        }
        throw e;
    }
}

export default function* request(
    method: RequestMethod,
    requestUrl: string,
    body: BodyInit | undefined,
    requestConfig: RequestConfig | undefined,
    antonio: TAntonio,
) {
    const generalConfig: GeneralConfig = generalConfigs.get(antonio);
    const { url, requestInit, config } = createRequestInit(
        method,
        requestUrl,
        body,
        requestConfig,
        antonio.defaults,
        generalConfig,
    );

    const requestInterceptors: RequestInterceptorsEntries = interceptors.get(antonio.interceptors.request);
    const request = yield applyRequestInteceptors(requestInterceptors, url, requestInit);

    const responseInterceptors: ResponseInterceptorsEntries = interceptors.get(antonio.interceptors.response);
    const { response, data } = yield applyResponseInterceptors(responseInterceptors, request, config);

    return { request, response, data };
}
