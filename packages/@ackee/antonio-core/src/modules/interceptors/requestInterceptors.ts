import type { RequestParams, RequestMethod } from '../../types';

interface OnRequestParams {
    (requestParams: RequestParams, requestMethod: RequestMethod):
        | RequestParams
        | Generator<unknown, RequestParams>
        | Promise<RequestParams>;
}

interface OnRequest {
    (request: Request): Request | Generator<unknown, Request> | Promise<Request>;
}

export type RequestInterceptors = Map<
    number,
    {
        onRequestParams?: OnRequestParams;
        onRequest?: OnRequest;
    }
>;

class RequestInterceptorManager {
    private id: number;
    protected interceptors: RequestInterceptors;

    constructor() {
        this.id = 0;
        this.interceptors = new Map();
    }

    /**
     * Intercept every request with attached methods:
     * 1. onRequestParams - Customize `bodyData`, `config` or `url` before a `Request` object from it is created
     *   - The `requestParams.config` is already merged at this point the defaults from Antonio's constructor.
     * 2. onRequest - Customize `Request` object before passing it to the `fetch`.
     *
     * _1. Example - Set the same `responseDataType` for each GET request_
     * @example
     * ```ts
     * const api = new Antonio();
     *
     * const interceptorId = api.interceptors.request.use(({ url, bodyData, config }: RequestParams, method: RequestMethod) => {
     *    if (method === 'GET') {
     *       requestParams.config.responseDataType = 'iterableStream';
     *    }
     *
     *    return { url, bodyData, config };
     * })
     * ```
     *
     * _2. Example - Custom `params` encoding_
     *
     * Note that if `params` are already an instace of `URLSearchParams`, 
     * Antonio will only stringify them as `url.search = searchParams.toString()`. 
     * That's all it does with it in that case.
     * @example
     * ```ts
     * import { Antonio, RequestSearchParams } from `@ackee/antonio-core`;
     * const api = new Antonio();
    
    // For instance, some API might only accepts encoded arrays with key suffix `[]`:
    const suffixSearchParamName = (name: string) => `${name}[]`;

    function encodeParamsToSearchParams(params: RequestSearchParams) {
        if (params instanceof URLSearchParams) {
            return params;
        }
        const searchParams = new URLSearchParams();

        for (const [name, value] of Object.entries(params)) {
            if (Array.isArray(value)) {
                const arrayMemberName = suffixSearchParamName(name);
                value.forEach(item => searchParams.append(arrayMemberName, String(item)));
            } else {
                searchParams.append(name, String(value));
            }
        }

        return searchParams;
    }
     *
     * const interceptorId = api.interceptors.request.use(({ url, bodyData, config }: RequestParams, method: RequestMethod) => {
     *    if (config.params) {
     *       config.params = encodeSearchParams(params);
     *    }
     *
     *    return { url, bodyData, config };
     * })
     * ```
     *
     * _3. Example - Set Authorization header_
     * @example
     * ```ts
     * const api = new Antonio();
     *
     * function* getAccessToken() {
     *    // obtain access token
     *    return '...'
     * }
     *
     * const interceptorId = api.interceptors.request.use(null, function*(request: Request) {
     *    const token = yield getAccessToken();
     *    request.headers.set('Authorization', token);
     *    return request;
     * })
     * ```
     */
    use(onRequestParams?: OnRequestParams, onRequest?: OnRequest): number {
        const nextId = this.id++;

        this.interceptors.set(nextId, { onRequestParams, onRequest });

        return nextId;
    }

    /**
     * Remove an interceptor by passing here the id from `use` method.
     */
    eject(id: number): boolean {
        return this.interceptors.delete(id);
    }
}

export default RequestInterceptorManager;
