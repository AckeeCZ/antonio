import type { GeneralConfig } from '../../../core/general-config';

import type { RequestConfig } from '../../../../types';

import { encodeParamsToSearchParams } from './searchParams';
import { setUriParams } from './uriParams';

const removeSlashAtStartAndAtEnd = (chunk: string) => chunk.replace(/^\/|\/$/g, '');

function joinUrlChunks(baseUrl?: string, ...path: string[]) {
    const joinedUrl = [baseUrl, ...path].filter(Boolean).map(removeSlashAtStartAndAtEnd).join('/');
    return new URL(joinedUrl);
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

        const url = joinUrlChunks(requestConfig.baseURL, requestUrl);

        url.search = encodeParamsToSearchParams(requestConfig.params).toString();

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
