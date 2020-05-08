import { ResponseType, Header, ResponseTypes, Methods } from '../constants';
import { mergeUrlSearchParams } from '../utils';

export function formatRequestBody(body, config) {
    if (config.responseType === ResponseType.JSON) {
        return JSON.stringify(body);
    }

    return body;
}

const isTokenTemplate = token => token.startsWith(':');

function setUriParams(templateUrl, uriParams) {
    const templateToValue = token => {
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

export function createRequestUrl(requestUrl, requestConfig) {
    try {
        if (requestConfig.uriParams) {
            requestUrl = setUriParams(requestUrl, requestConfig.uriParams);
        }

        const url = new URL(requestUrl, requestConfig.baseURL);

        url.search = mergeUrlSearchParams(new URLSearchParams(url.search), requestConfig.searchParams);

        return url;
    } catch (e) {
        // TODO: use log-level
        console.error(e);
        throw new TypeError(
            `Could not compose request url from: requestUrl: '${requestUrl}' and baseURL: '${requestConfig.baseURL}'.`,
        );
    }
}

export function setRequestHeaders(method, config) {
    const headers = new Headers(config.headers);

    if (!headers.has(Header.CONTENT_TYPE) && method !== Methods.HEAD) {
        headers.set(Header.CONTENT_TYPE, ResponseTypes[config.responseType]);
    }

    return headers;
}
