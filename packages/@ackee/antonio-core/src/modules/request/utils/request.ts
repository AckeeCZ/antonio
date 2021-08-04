import type { RequestMethod, RequestParams } from '../../../types';
import type { GeneralConfig } from '../../core/general-config';

import { createRequestUrl } from './url';
import { formatBodyData } from './formatBodyData';

export function createRequestInit(method: RequestMethod, requestParams: RequestParams, generalConfig: GeneralConfig) {
    const { url, config, bodyData } = requestParams;
    const requestUrl = createRequestUrl(url, config, generalConfig);

    const { mode, credentials, cache, redirect, referrer, referrerPolicy, integrity, keepalive, signal, headers } =
        config;
    const body = formatBodyData(bodyData);
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
