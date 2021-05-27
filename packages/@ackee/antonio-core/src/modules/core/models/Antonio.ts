import { RequestConfig, GeneralConfig } from '../../../types';

import { defaultRequestConfig, DefaultRequestConfig } from '../request-config';
import { defaultGeneralConfig, generalConfigs } from '../general-config';
import { mergeRequestConfigs } from '../utils';
import request from '../request';

import InterceptorManager, { InterceptorManagers } from './InterceptorManager';
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

    post(url: string, body: BodyInit, requestConfig?: RequestConfig) {
        return request('post', url, body, requestConfig, this);
    }

    put(url: string, body: BodyInit, requestConfig?: RequestConfig) {
        return request('put', url, body, requestConfig, this);
    }

    patch(url: string, body: BodyInit, requestConfig?: RequestConfig) {
        return request('patch', url, body, requestConfig, this);
    }

    get(url: string, requestConfig?: RequestConfig) {
        return request('get', url, undefined, requestConfig, this);
    }

    delete(url: string, requestConfig?: RequestConfig) {
        return request(
            'delete',
            url,
            undefined,
            {
                ...requestConfig,
                // TODO: Consider other option that jsut forcing it here.
                // Maybe, use different default configs for each req. method.
                responseType: 'text',
            },
            this,
        );
    }

    head(url: string, requestConfig?: RequestConfig) {
        return request(
            'head',
            url,
            undefined,
            {
                ...requestConfig,
                responseType: 'text',
            },
            this,
        );
    }

    options(url: string, requestConfig?: RequestConfig) {
        return request('options', url, undefined, requestConfig, this);
    }
}

export type TAntonio = Antonio;

export default Antonio;
