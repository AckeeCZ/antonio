import type { RequestMethod, RequestConfig, RequestHeaders, RequestBodyData } from '../../../types';
import { Header } from '../../../constants';
import type { GeneralConfig } from '../../core/general-config';

import type { DefaultRequestConfig } from '../config';
import { getDefaultRequestMimeType } from '../mimeTypes';

import { mergeRequestConfigs } from './mergeRequestConfigs';
import { createRequestUrl } from './url';
import { formatBodyData } from './formatBodyData';

function setContentTypeHeader(method: RequestMethod, config: DefaultRequestConfig, body?: BodyInit): RequestHeaders {
    const headers = config.headers as Headers;

    if (!headers.has(Header.CONTENT_TYPE) && method !== 'HEAD' && body) {
        const defaultMimeType = getDefaultRequestMimeType(body);
        headers.set(Header.CONTENT_TYPE, defaultMimeType);
    }

    return headers;
}

export function createRequestInit(
    method: RequestMethod,
    requestUrl: string,
    bodyData: RequestBodyData | undefined,
    requestConfig: RequestConfig | undefined,
    defaultRequestConfig: DefaultRequestConfig,
    generalConfig: GeneralConfig,
) {
    const config = mergeRequestConfigs(defaultRequestConfig, requestConfig);

    const url = createRequestUrl(requestUrl, config, generalConfig);
    const { mode, credentials, cache, redirect, referrer, referrerPolicy, integrity, keepalive, signal } = config;
    const body = formatBodyData(bodyData);
    const headers = setContentTypeHeader(method, config, body);
    const requestInit: RequestInit = {
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
        body,
        headers,
    };

    return {
        url,
        requestInit,
        config,
    };
}
