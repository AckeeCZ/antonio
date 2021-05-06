import { RequestConfig, RequestBody, GeneralConfig } from 'types';

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
            request: new InterceptorManager<RequestInit>(),
            response: new InterceptorManager<Response>(),
        });

        generalConfigs.set(
            this,
            Object.freeze<GeneralConfig>({
                ...defaultGeneralConfig,
                ...generalConfig,
            }),
        );
    }

    *post(url: string, body: RequestBody, requestConfig?: RequestConfig) {
        return yield request('post', url, body, requestConfig, this);
    }

    *put(url: string, body: RequestBody, requestConfig?: RequestConfig) {
        return yield request('put', url, body, requestConfig, this);
    }

    *patch(url: string, body: RequestBody, requestConfig?: RequestConfig) {
        return yield request('patch', url, body, requestConfig, this);
    }

    *get(url: string, requestConfig?: RequestConfig) {
        return yield request('get', url, undefined, requestConfig, this);
    }

    *delete(url: string, requestConfig?: RequestConfig) {
        return yield request('delete', url, undefined, requestConfig, this);
    }

    *head(url: string, requestConfig?: RequestConfig) {
        return yield request('head', url, undefined, requestConfig, this);
    }

    *options(url: string, requestConfig?: RequestConfig) {
        return yield request('options', url, undefined, requestConfig, this);
    }
}

export type TAntonio = Antonio;

export default Antonio;