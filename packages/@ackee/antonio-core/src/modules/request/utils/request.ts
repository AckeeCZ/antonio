import Headers from 'fetch-headers';
import type { RequestMethod, RequestConfig, RequestParams } from '../../../types';
import { Header } from '../../../constants';
import type { GeneralConfig } from '../../core/general-config';

import { getDefaultRequestMimeType } from '../mimeTypes';

import { createRequestUrl } from './url';
import { formatBodyData } from './formatBodyData';

export function setContentTypeHeader(method: RequestMethod, config: RequestConfig, body?: BodyInit) {
    const headers = new Headers(config.headers);

    if (!headers.has(Header.CONTENT_TYPE) && method !== 'HEAD' && body) {
        const defaultMimeType = getDefaultRequestMimeType(body);
        if (defaultMimeType) {
            headers.set(Header.CONTENT_TYPE, defaultMimeType);
        }
    }

    return headers;
}

export function createRequestInit(method: RequestMethod, requestParams: RequestParams, generalConfig: GeneralConfig) {
    const { url, config, bodyData } = requestParams;
    const requestUrl = createRequestUrl(url, config, generalConfig);

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
        requestUrl,
        requestInit,
    };
}
