import { RequestConfig, RequestBodyData } from '../../../types';

import { mergeRequestConfigs } from '../../request/utils';
import { defaultRequestConfig, DefaultRequestConfig } from '../../request/config';

import { defaultGeneralConfig, generalConfigs } from '../general-config';
import type { GeneralConfig } from '../general-config';
import makeRequest from '../makeRequest';

import InterceptorManager, { InterceptorManagers } from '../../interceptors/InterceptorManager';
class Antonio {
    readonly defaults: DefaultRequestConfig;
    readonly interceptors: InterceptorManagers;

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

    post(url: string, body: RequestBodyData, requestConfig?: RequestConfig) {
        return makeRequest('post', url, body, requestConfig, this);
    }

    put(url: string, body: RequestBodyData, requestConfig?: RequestConfig) {
        return makeRequest('put', url, body, requestConfig, this);
    }

    patch(url: string, body: RequestBodyData, requestConfig?: RequestConfig) {
        return makeRequest('PATCH', url, body, requestConfig, this);
    }

    get(url: string, requestConfig?: RequestConfig) {
        return makeRequest('get', url, undefined, requestConfig, this);
    }

    delete(url: string, requestConfig?: RequestConfig) {
        return makeRequest(
            'delete',
            url,
            undefined,
            // TODO: test
            requestConfig,
            // {
            //     ...requestConfig,
            //     // TODO: Consider other option that jsut forcing it here.
            //     // Maybe, use different default configs for each req. method.
            //     responseDataType: 'text',
            // },
            this,
        );
    }

    head(url: string, requestConfig?: RequestConfig) {
        return makeRequest(
            'head',
            url,
            undefined,
            // TODO: test
            requestConfig,
            // {
            //     ...requestConfig,
            //     responseDataType: 'text',
            // },
            this,
        );
    }

    options(url: string, requestConfig?: RequestConfig) {
        return makeRequest('options', url, undefined, requestConfig, this);
    }
}

export type TAntonio = Antonio;

export default Antonio;
