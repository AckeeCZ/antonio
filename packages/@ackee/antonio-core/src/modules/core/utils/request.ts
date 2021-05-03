import Headers from 'fetch-headers';
import {
    Header,
    ResponseTypes,
    RequestMethod,
    RequestConfig,
    RequestHeaders,
    RequestUriParams,
    RequestBody,
    GeneralConfig,
} from '../../../types';
import { mergeUrlSearchParams } from './mergeRequestConfigs';

export function formatRequestBody(body: RequestBody, config: RequestConfig): RequestBody {
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

export function createRequestUrl(
    requestUrl: string,
    requestConfig: RequestConfig,
    generalConfig: GeneralConfig,
): string {
    try {
        if (requestConfig.uriParams) {
            requestUrl = setUriParams(requestUrl, requestConfig.uriParams);
        }

        const url = new URL(requestUrl, requestConfig.baseURL);

        url.search = mergeUrlSearchParams(
            new URLSearchParams(url.search),
            new URLSearchParams(requestConfig.searchParams),
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

export function setRequestHeaders(method: RequestMethod, config: RequestConfig): RequestHeaders {
    const headers = new Headers(config.headers);

    if (!headers.has(Header.CONTENT_TYPE) && method !== 'head' && config.responseType) {
        headers.set(Header.CONTENT_TYPE, ResponseTypes[config.responseType]);
    }

    return headers;
}
