import { RequestBodyData, RequestConfig, RequestMethod, RequestResult } from '../../../types';

import { defaultRequestConfig, DefaultRequestConfig } from '../../request/config';
import { mergeRequestConfigs } from '../../request/utils';

import type { GeneralConfig } from '../general-config';
import { defaultGeneralConfig } from '../general-config';
import makeRequest, { generatorToPromise } from '../makeRequest';

import type { InterceptorManagers } from '../../interceptors';
import RequestInterceptorManager from '../../interceptors/requestInterceptors';
import ResponseInterceptorManager from '../../interceptors/responseInterceptors';

export type AntonioRequest<RM extends RequestMethod> = Readonly<
    RequestConfig & {} & (RM extends 'POST' | 'PATCH' | 'PUT'
            ? {
                  body: Required<RequestBodyData>;
                  method: RM;
                  url: string;
              }
            : {
                  method: RM;
                  url: string;
              })
>;

export class Antonio<TSuccessDataDefault = unknown, TErrorDataDefault = unknown> {
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
            request: new RequestInterceptorManager(),
            response: new ResponseInterceptorManager(),
        });

        this.generalConfig = Object.freeze<GeneralConfig>({
            ...defaultGeneralConfig,
            ...generalConfig,
        });
    }

    request<RM extends RequestMethod, TSuccessData = TSuccessDataDefault, TErrorData = TErrorDataDefault>(
        props: AntonioRequest<RM>,
    ): Promise<RequestResult<TSuccessData>> {
        // @ts-expect-error
        const { method, url, body, ...requestConfig } = props;

        const it = makeRequest<TSuccessData, TErrorData>(this, method, url, body, requestConfig);

        return generatorToPromise<RequestResult<TSuccessData>>(it);
    }

    post<TSuccessData = TSuccessDataDefault, TErrorData = TErrorDataDefault>(
        url: string,
        body: RequestBodyData,
        requestConfig?: RequestConfig,
    ) {
        return makeRequest<TSuccessData, TErrorData>(this, 'POST', url, body, requestConfig);
    }

    put<TSuccessData = TSuccessDataDefault, TErrorData = TErrorDataDefault>(
        url: string,
        body: RequestBodyData,
        requestConfig?: RequestConfig,
    ) {
        return makeRequest<TSuccessData, TErrorData>(this, 'PUT', url, body, requestConfig);
    }

    patch<TSuccessData = TSuccessDataDefault, TErrorData = TErrorDataDefault>(
        url: string,
        body: RequestBodyData,
        requestConfig?: RequestConfig,
    ) {
        return makeRequest<TSuccessData, TErrorData>(this, 'PATCH', url, body, requestConfig);
    }

    get<TSuccessData = TSuccessDataDefault, TErrorData = TErrorDataDefault>(
        url: string,
        requestConfig?: RequestConfig,
    ) {
        return makeRequest<TSuccessData, TErrorData>(this, 'GET', url, null, requestConfig);
    }

    delete<TSuccessData = TSuccessDataDefault, TErrorData = TErrorDataDefault>(
        url: string,
        requestConfig?: RequestConfig,
    ) {
        return makeRequest<TSuccessData, TErrorData>(this, 'DELETE', url, null, requestConfig);
    }

    head<TSuccessData = TSuccessDataDefault, TErrorData = TErrorDataDefault>(
        url: string,
        requestConfig?: RequestConfig,
    ) {
        return makeRequest<TSuccessData, TErrorData>(this, 'HEAD', url, null, requestConfig);
    }

    options<TSuccessData = TSuccessDataDefault, TErrorData = TErrorDataDefault>(
        url: string,
        requestConfig?: RequestConfig,
    ) {
        return makeRequest<TSuccessData, TErrorData>(this, 'OPTIONS', url, null, requestConfig);
    }
}

export type TAntonio = Antonio;
