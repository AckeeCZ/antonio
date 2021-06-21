import { Header } from '../../constants';
import type { RequestMethod } from '../../types';

import type { ResponseInterceptorsEntries } from '../interceptors';
import { interceptors } from '../interceptors';
import type { TAntonio } from '../core/models/Antonio';
import { DefaultRequestConfig } from '../request/config';

import { getResponseDataType } from './responseDataTypes';

import { AntonioError } from './errors';
import { parseResponse, hasEmptyContentLength } from './utils';

function chooseResponseDataType(config: DefaultRequestConfig, headers: Headers, requestMethod: RequestMethod) {
    if (hasEmptyContentLength(headers) || requestMethod === 'HEAD' || requestMethod === 'OPTIONS') {
        return null;
    }

    if (config.responseDataType !== undefined) {
        return config.responseDataType;
    }

    return getResponseDataType(headers.get(Header.CONTENT_TYPE));
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

        const responseDataType = chooseResponseDataType(config, response.headers, request.method as RequestMethod);
        const data = await parseResponse(responseDataType, response);

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

export async function* processRequest(request: Request, config: DefaultRequestConfig, antonio: TAntonio) {
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
