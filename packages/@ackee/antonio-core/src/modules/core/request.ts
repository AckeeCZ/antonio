import { RequestMethod, RequestResult, GeneralConfig, RequestConfig } from 'types';
import { DefaultRequestConfig } from './config';
import { HTTPError } from './errors';
import { createRequestUrl, formatRequestBody, setRequestHeaders, parseResponse, mergeRequestConfigs } from './utils';

export default async function request(
    method: RequestMethod,
    requestUrl: string,
    body: BodyInit | undefined,
    requestConfig: RequestConfig | undefined,
    defaultRequestConfig: DefaultRequestConfig,
    generalConfig: GeneralConfig,
): Promise<RequestResult> {
    const config = mergeRequestConfigs(defaultRequestConfig, requestConfig);

    const url = createRequestUrl(requestUrl, config, generalConfig);

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

    const data = await parseResponse(config.responseType, response);

    if (!response.ok) {
        // TODO: try response.error instead
        throw new HTTPError(request, response, data);
    }

    return {
        request,
        response,
        data,
    };
}
