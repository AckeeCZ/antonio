import { RequestConfig, RequestBody, GeneralConfig } from '../../../types';
import { defaultRequestConfig, defaultGeneralConfig, DefaultRequestConfig } from '../config';
import { mergeRequestConfigs } from '../utils';

import request from '../request';

export const generalConfigs = new WeakMap();

class Antonio {
    readonly defaults: DefaultRequestConfig;
    readonly config: GeneralConfig;

    constructor(requestConfig?: RequestConfig, generalConfig?: Partial<GeneralConfig>) {
        this.defaults = Object.freeze<DefaultRequestConfig>(mergeRequestConfigs(defaultRequestConfig, requestConfig));

        const config = Object.freeze<GeneralConfig>({
            ...defaultGeneralConfig,
            ...generalConfig,
        });
        generalConfigs.set(this, config);
    }

    post(url: string, body: RequestBody, requestConfig?: RequestConfig) {
        return request('post', url, body, requestConfig, this.defaults, generalConfigs.get(this));
    }

    put(url: string, body: RequestBody, requestConfig?: RequestConfig) {
        return request('put', url, body, requestConfig, this.defaults, generalConfigs.get(this));
    }

    patch(url: string, body: RequestBody, requestConfig?: RequestConfig) {
        return request('patch', url, body, requestConfig, this.defaults, generalConfigs.get(this));
    }

    get(url: string, requestConfig?: RequestConfig) {
        return request('get', url, undefined, requestConfig, this.defaults, generalConfigs.get(this));
    }

    delete(url: string, requestConfig?: RequestConfig) {
        return request('delete', url, undefined, requestConfig, this.defaults, generalConfigs.get(this));
    }

    head(url: string, requestConfig?: RequestConfig) {
        return request('head', url, undefined, requestConfig, this.defaults, generalConfigs.get(this));
    }

    options(url: string, requestConfig?: RequestConfig) {
        return request('options', url, undefined, requestConfig, this.defaults, generalConfigs.get(this));
    }
}

export default Antonio;
