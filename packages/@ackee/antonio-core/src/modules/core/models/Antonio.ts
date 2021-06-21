import { RequestConfig, RequestBodyData } from '../../../types';

import { mergeRequestConfigs } from '../../request/utils';
import { defaultRequestConfig, DefaultRequestConfig } from '../../request/config';

import { defaultGeneralConfig, generalConfigs } from '../general-config';
import type { GeneralConfig } from '../general-config';
import makeRequest from '../makeRequest';

import InterceptorManager, { InterceptorManagers, interceptors } from '../../interceptors/InterceptorManager';
export class Antonio {
    readonly defaults: DefaultRequestConfig;
    readonly interceptors: InterceptorManagers;

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

        generalConfigs.set(
            this,
            Object.freeze<GeneralConfig>({
                ...defaultGeneralConfig,
                ...generalConfig,
            }),
        );
    }

    post<D>(url: string, body: RequestBodyData, requestConfig?: RequestConfig) {
        return makeRequest<D>('POST', url, body, requestConfig, this);
    }

    put<D>(url: string, body: RequestBodyData, requestConfig?: RequestConfig) {
        return makeRequest<D>('PUT', url, body, requestConfig, this);
    }

    patch<D>(url: string, body: RequestBodyData, requestConfig?: RequestConfig) {
        return makeRequest<D>('PATCH', url, body, requestConfig, this);
    }

    get<D>(url: string, requestConfig?: RequestConfig) {
        return makeRequest<D>('GET', url, undefined, requestConfig, this);
    }

    delete<D>(url: string, requestConfig?: RequestConfig) {
        return makeRequest<D>('DELETE', url, undefined, requestConfig, this);
    }

    head<D>(url: string, requestConfig?: RequestConfig) {
        return makeRequest<D>('HEAD', url, undefined, requestConfig, this);
    }

    options<D>(url: string, requestConfig?: RequestConfig) {
        return makeRequest<D>('OPTIONS', url, undefined, requestConfig, this);
    }

    /**
     * Clears-up memory after the current Antonio instance.
     */
    destroy() {
        interceptors.delete(this);
        generalConfigs.delete(this);
    }
}

export type TAntonio = Antonio;
