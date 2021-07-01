import type { RequestMethod, RequestConfig, RequestBodyData, RequestParams } from '../../types';

import type { RequestInterceptors } from '../interceptors/requestInterceptors';
import type { TAntonio } from '../core/models/Antonio';
import { createRequestInit, mergeRequestConfigs } from './utils';

function* applyRequestInteceptors(
    requestInterceptors: RequestInterceptors,
    requestMethod: RequestMethod,
    requestParams: RequestParams,
) {
    let result = requestParams;

    for (const [id, requestInterceptor] of requestInterceptors.entries()) {
        result = yield requestInterceptor(requestParams, requestMethod);

        if (!result || !result.bodyData || !result.config || !result.url) {
            throw new TypeError(
                // eslint-disable-next-line max-len
                `A request interceptor with id '${id}' must return object with shape of '{ url: string; config: RequestConfig; bodyData:  RequestBodyData; }'.\nReceived: ${JSON.stringify(
                    result,
                    null,
                    2,
                )}`,
            );
        }
    }

    return result;
}

export function* createRequest(
    antonio: TAntonio,
    method: RequestMethod,
    url: string,
    bodyData: RequestBodyData,
    requestConfig?: RequestConfig,
) {
    const config = mergeRequestConfigs(antonio.defaults, requestConfig);

    const requestInterceptors = antonio.interceptors.request._interceptors;
    const requestParams = yield* applyRequestInteceptors(requestInterceptors, method, { url, config, bodyData });

    const { requestUrl, requestInit } = createRequestInit(method, requestParams, antonio.generalConfig);
    const request = new Request(requestUrl, requestInit);

    return {
        request,
        requestParams,
        config,
    };
}
