import type { GeneralConfig } from '../../../core/general-config';

import type { FinalRequestConfig } from '../mergeRequestConfigs';

import { setUriParams } from './uriParams';

const removeSlashAtStartAndAtEnd = (chunk: string) => chunk.replace(/^\/|\/$/g, '');

export function joinUrlChunks(baseUrl?: string, ...path: string[]) {
    const joinedUrl = [baseUrl, ...path].filter(Boolean).map(removeSlashAtStartAndAtEnd).join('/');
    return new URL(joinedUrl);
}

export function createRequestUrl(
    requestUrl: string,
    requestConfig: FinalRequestConfig,
    generalConfig: GeneralConfig,
): string {
    try {
        if (requestConfig.uriParams) {
            requestUrl = setUriParams(requestUrl, requestConfig.uriParams);
        }

        const url = joinUrlChunks(requestConfig.baseURL, requestUrl);

        if (requestConfig.params) {
            url.search = requestConfig.params.toString();
        }

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
