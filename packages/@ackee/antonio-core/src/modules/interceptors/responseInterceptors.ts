import type { RequestParams } from '../../types';
import type { AntonioError } from '../../modules/response/errors';

interface OnResponseFulfilled {
    (response: Response, request: Request, requestParams: RequestParams):
        | Response
        | Generator<unknown, Response>
        | Promise<Response>;
}

type OnResponseRejectedResult = AntonioError | Error | null;

interface OnResponseRejected {
    (error: AntonioError | Error, request: Request, requestParams: RequestParams):
        | OnResponseRejectedResult
        | Promise<OnResponseRejectedResult>;
}

export type ResponseInterceptors = Map<
    number,
    {
        onFulfilled?: OnResponseFulfilled;
        onRejected?: OnResponseRejected;
    }
>;

class ResponseInterceptorManager {
    private id: number;
    protected interceptors: ResponseInterceptors;

    constructor() {
        this.id = 0;
        this.interceptors = new Map();
    }

    /**
     * Intercept every response with attached methods:
     * 1. onFulfilled - Called if `response.ok` is `true`.
     * 2. onRejected - Called if `fetch`, any of `onFulfilled` callbackes throw an error or `response.ok` is `false`.
    
     * ### `onFulfilled` examples:
     *
     * _1. Blank_
     * @example
     * ```ts
     * import { Antonio } from `@ackee/antonio-core`;
     * const api = new Antonio();
     *
     * api.interceptors.response.use(function*(response, request, requestParams) {
     *    // Dunno. Do something with the `response` and then return it.
     *    return response;
     * })
     * ```

     *
     * ### `onRejected` examples:
     *
     * _1. Silent response error if status matches, for instance, to `123`_
     * @example
     * ```ts
     * import { Antonio, isAntonioError } from `@ackee/antonio-core`;
     * const api = new Antonio();
     *
     * api.interceptors.response.use(null, function*(error) {
     *    if (isAntonioError(error) && error.response.status === 123) {
     *       return null;
     *    }
     *
     *    return error;
     * })
     * ```
     * 
     * _2. Log (e.g. to Sentry) only errors that match some specific criteria_
     * @example
     * ```ts
     * import { Antonio, isAntonioError } from `@ackee/antonio-core`;
     * const api = new Antonio();
     *
     * api.interceptors.response.use(null, error => {
     *    if (!isAntonioError(error)) {
     *       Sentry.captureException(error)
     *    }
     *
     *    return error;
     * })
     * ```

     */
    use(onFulfilled?: OnResponseFulfilled, onRejected?: OnResponseRejected): number {
        const nextId = this.id++;

        this.interceptors.set(nextId, {
            onFulfilled,
            onRejected,
        });

        return nextId;
    }

    /**
     * Remove an interceptor by passing here the id from `use` method.
     */
    eject(id: number): boolean {
        return this.interceptors.delete(id);
    }
}

export default ResponseInterceptorManager;
