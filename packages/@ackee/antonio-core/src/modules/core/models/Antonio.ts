import { RequestConfig, RequestBodyData } from '../../../types';

import { mergeRequestConfigs } from '../../request/utils';
import { defaultRequestConfig, DefaultRequestConfig } from '../../request/config';

import { defaultGeneralConfig } from '../general-config';
import type { GeneralConfig } from '../general-config';
import makeRequest from '../makeRequest';

import InterceptorManager, { InterceptorManagers, interceptors } from '../../interceptors/InterceptorManager';
export class Antonio<TSuccessDataDefault = any, TErrorDataDefault = any> {
    readonly defaults: DefaultRequestConfig;
    readonly interceptors: InterceptorManagers;
    readonly generalConfig: GeneralConfig;

    /**
     * @example
     * ```ts
     * import { Antonio } from `@ackee/antonio-core`;
     *
     * const api = new Antonio({
     *  baseURL: 'https://some-domain.com/api/',
     * });
     * ```
     */
    constructor(requestConfig?: RequestConfig, generalConfig?: Partial<GeneralConfig>) {
        this.defaults = Object.freeze<DefaultRequestConfig>(mergeRequestConfigs(defaultRequestConfig, requestConfig));

        this.interceptors = Object.freeze<InterceptorManagers>({
            request: new InterceptorManager<Request, RequestConfig>(),
            response: new InterceptorManager<Response, RequestConfig>(),
        });

        this.generalConfig = Object.freeze<GeneralConfig>({
            ...defaultGeneralConfig,
            ...generalConfig,
        });
    }

    post<TSuccessData = TSuccessDataDefault, TErrorData = TErrorDataDefault>(
        url: string,
        body: RequestBodyData,
        requestConfig?: RequestConfig,
    ) {
        return makeRequest<TSuccessData, TErrorData>('POST', url, body, requestConfig, this);
    }

    put<TSuccessData = TSuccessDataDefault, TErrorData = TErrorDataDefault>(
        url: string,
        body: RequestBodyData,
        requestConfig?: RequestConfig,
    ) {
        return makeRequest<TSuccessData, TErrorData>('PUT', url, body, requestConfig, this);
    }

    patch<TSuccessData = TSuccessDataDefault, TErrorData = TErrorDataDefault>(
        url: string,
        body: RequestBodyData,
        requestConfig?: RequestConfig,
    ) {
        return makeRequest<TSuccessData, TErrorData>('PATCH', url, body, requestConfig, this);
    }

    get<TSuccessData = TSuccessDataDefault, TErrorData = TErrorDataDefault>(
        url: string,
        requestConfig?: RequestConfig,
    ) {
        return makeRequest<TSuccessData, TErrorData>('GET', url, undefined, requestConfig, this);
    }

    delete<TSuccessData = TSuccessDataDefault, TErrorData = TErrorDataDefault>(
        url: string,
        requestConfig?: RequestConfig,
    ) {
        return makeRequest<TSuccessData, TErrorData>('DELETE', url, undefined, requestConfig, this);
    }

    head<TSuccessData = TSuccessDataDefault, TErrorData = TErrorDataDefault>(
        url: string,
        requestConfig?: RequestConfig,
    ) {
        return makeRequest<TSuccessData, TErrorData>('HEAD', url, undefined, requestConfig, this);
    }

    options<TSuccessData = TSuccessDataDefault, TErrorData = TErrorDataDefault>(
        url: string,
        requestConfig?: RequestConfig,
    ) {
        return makeRequest<TSuccessData, TErrorData>('OPTIONS', url, undefined, requestConfig, this);
    }

    /**
     * Clears-up memory after the current Antonio instance.
     */
    destroy() {
        interceptors.delete(this);
    }
}

export type TAntonio = Antonio;
