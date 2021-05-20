import Headers from 'fetch-headers';
import {
    Header,
    ResponseTypes,
    RequestMethod,
    RequestConfig,
    RequestHeaders,
    RequestUriParams,
    GeneralConfig,
} from '../../../types';
import { DefaultRequestConfig } from '../request-config';

import { mergeUrlSearchParams, mergeRequestConfigs } from './mergeRequestConfigs';

function formatRequestBody(body: BodyInit | undefined, config: RequestConfig) {
    if (config.responseType === 'json') {
        return JSON.stringify(body);
    }

    return body;
}

const isTokenTemplate = (token: string): boolean => token.startsWith(':');

function setUriParams(templateUrl: string, uriParams: RequestUriParams): string {
    const templateToValue = (token: string) => {
        if (!isTokenTemplate(token)) {
            return token;
        }

        const uriParamKey = token.slice(1);
        const value = uriParams[uriParamKey];

        if (value === undefined) {
            throw new TypeError(
                `No URI param found for '${token}' template token among URI params: \n${JSON.stringify(
                    uriParams,
                    null,
                    2,
                )}\n for template URL: '${templateUrl}'.`,
            );
        }

        // replace template (:itemId) with actual value
        return value;
    };

    return templateUrl.split('/').map(templateToValue).join('/');
}

const removeSlashAtStartAndAtEnd = (chunk: string) => chunk.replace(/^\/|\/$/g, '');

function joinUrlChunks(baseUrl?: string, ...path: string[]) {
    const joinedUrl = [baseUrl, ...path].filter(Boolean).map(removeSlashAtStartAndAtEnd).join('/');
    return new URL(joinedUrl);
}

const isValidSearchParam = (value: any) => {
    value = String(value);

    return value !== 'undefined' && value !== 'null' && value !== '';
};

function getValidSearchParams(searchParams: URLSearchParams): URLSearchParams {
    const validSearchParams = new URLSearchParams();
    for (const [key, value] of searchParams.entries()) {
        if (isValidSearchParam(value)) {
            validSearchParams.set(key, value);
        }
    }
    return validSearchParams;
}

function createRequestUrl(requestUrl: string, requestConfig: RequestConfig, generalConfig: GeneralConfig): string {
    try {
        if (requestConfig.uriParams) {
            requestUrl = setUriParams(requestUrl, requestConfig.uriParams);
        }

        const url = joinUrlChunks(requestConfig.baseURL, requestUrl);

        url.search = getValidSearchParams(
            mergeUrlSearchParams(
                new URLSearchParams(url.search),
                new URLSearchParams(requestConfig.searchParams || requestConfig.params),
            ),
        ).toString();

        return url.toString();
    } catch (e) {
        generalConfig.logger.error(e, {
            requestUrl,
            requestConfig,
        });
        throw new TypeError(
            `Could not compose request url from: requestUrl: '${requestUrl}' and baseURL: '${requestConfig.baseURL}'.`,
        );
    }
}

function setRequestHeaders(method: RequestMethod, config: RequestConfig): RequestHeaders {
    const headers = new Headers(config.headers);

    if (!headers.has(Header.CONTENT_TYPE) && method !== 'head' && config.responseType) {
        headers.set(Header.CONTENT_TYPE, ResponseTypes[config.responseType]);
    }

    return headers;
}

export function createRequestInit(
    method: RequestMethod,
    requestUrl: string,
    body: BodyInit | undefined,
    requestConfig: RequestConfig | undefined,
    defaultRequestConfig: DefaultRequestConfig,
    generalConfig: GeneralConfig,
) {
    const config = mergeRequestConfigs(defaultRequestConfig, requestConfig);
    const url = createRequestUrl(requestUrl, config, generalConfig);
    const { mode, credentials, cache, redirect, referrer, referrerPolicy, integrity, keepalive, signal } = config;
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
        body: formatRequestBody(body, config),
        headers: setRequestHeaders(method, config),
    };

    return {
        url,
        requestInit,
        config,
    };
}
