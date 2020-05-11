import { RequestMethod, RequestConfig, RequestResult } from './constants';
import { HTTPError } from './errors';
import { createRequestUrl, formatRequestBody, setRequestHeaders, parseResponse, mergeConfig } from './utils';

export default async function request(
    method: RequestMethod,
    requestUrl: string,
    body: BodyInit | undefined,
    requestConfig: RequestConfig | undefined,
    defaultRequestConfig: RequestConfig,
): Promise<RequestResult> {
    const config = mergeConfig(defaultRequestConfig, requestConfig);

    const url = createRequestUrl(requestUrl, config);

    const { mode, credentials, cache, redirect, referrer, referrerPolicy, integrity, keepalive, signal } = config;

    const request = new Request(url, {
        method,
        mode,
        credentials,
        cache,
        redirect,
        referrer,
        referrerPolicy,
        integrity,
        keepalive,
        signal,
        body: formatRequestBody(body, config),
        headers: setRequestHeaders(method, config),
    });

    const response = await fetch(request);

    if (!response.ok) {
        // TODO: try response.error instead
        throw new HTTPError(response);
    }

    const data = await parseResponse(config.responseType, response);

    return {
        request,
        response,
        data,
    };
}
