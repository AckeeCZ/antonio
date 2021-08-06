import { Header } from '../../constants';
import type { RequestConfig, RequestMethod, RequestParams, RequestResult } from '../../types';

import type { ResponseInterceptors } from '../interceptors/responseInterceptors';
import type { TAntonio } from '../core/models/Antonio';

import { getResponseDataType } from './responseDataTypes';

import { AntonioError } from './errors';
import { parseResponse, hasEmptyContentLength } from './utils';

function chooseResponseDataType(config: RequestConfig, headers: Headers, requestMethod: RequestMethod) {
    if (hasEmptyContentLength(headers) || requestMethod === 'HEAD' || requestMethod === 'OPTIONS') {
        return null;
    }

    if (config.responseDataType !== undefined) {
        return config.responseDataType;
    }

    return getResponseDataType(headers.get(Header.CONTENT_TYPE));
}

async function* applyResponseInterceptors<TSuccessData, TErrorData>(
    responseInterceptors: ResponseInterceptors,
    request: Request,
    requestParams: RequestParams,
    requestConfig: RequestConfig,
) {
    let response = await fetch(request);

    for (const [id, responseInterceptor] of responseInterceptors.entries()) {
        if (responseInterceptor.onFulfilled) {
            response = yield responseInterceptor.onFulfilled(response, request, requestParams);

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

    const responseDataType = chooseResponseDataType(requestConfig, response.headers, request.method as RequestMethod);
    const data = await parseResponse(responseDataType, response);

    if (!response.ok) {
        const error = new AntonioError<TErrorData>(request, response, data as unknown as TErrorData);

        for (const responseInterceptor of responseInterceptors.values()) {
            if (responseInterceptor.onRejected) {
                yield responseInterceptor.onRejected(error, request, requestParams);
            }
        }

        throw error;
    }

    return {
        data: data as unknown as TSuccessData,
        response,
    };
}

export async function* processRequest<TSuccessData, TErrorData>(
    antonio: TAntonio,
    request: Request,
    requestParams: RequestParams,
    requestConfig: RequestConfig,
) {
    // @ts-ignore - Property 'interceptors' is protected and only accessible within class 'ResponseInterceptorManager' and its subclasses.
    const responseInterceptors = antonio.interceptors.response.interceptors;
    const { response, data } = yield* applyResponseInterceptors<TSuccessData, TErrorData>(
        responseInterceptors,
        request,
        requestParams,
        requestConfig,
    );

    const result: RequestResult<TSuccessData> = {
        request,
        response,
        data,
        status: response.status,
        statusText: response.statusText,
        config: requestConfig,
        headers: Object.fromEntries(response.headers.entries()),
    };

    return result;
}
