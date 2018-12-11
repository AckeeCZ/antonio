import axios from 'axios';

import requestInterceptors from './requestInterceptors';

export default function createApiWithAxios(options, proxy) {
    const axiosClient = axios.create(options);
    const api = {};

    const objects = new Set(['defaults', 'interceptors']);

    // - unwrap axios HTTP method handlers
    // - add custom proxies
    for (const key of Object.keys(axiosClient)) {
        const methodHandler = axiosClient[key];

        // wrap only functions with proxy function
        api[key] = !objects.has(key) && proxy ? proxy(methodHandler) : methodHandler;
    }

    // apply interceptors
    for (const requestInterceptor of requestInterceptors) {
        api.interceptors.request.use(requestInterceptor);
    }

    Object.freeze(api);

    return [api, axiosClient];
}
