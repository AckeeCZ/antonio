import type { RequestParams, RequestMethod } from '../../types';

interface OnRequestParams {
    (requestParams: RequestParams, requestMethod: RequestMethod):
        | RequestParams
        | Generator<unknown, RequestParams>
        | Promise<RequestParams>;
}

export type RequestInterceptors = Map<number, OnRequestParams>;

class RequestInterceptorManager {
    private id: number;
    _interceptors: RequestInterceptors;

    constructor() {
        this.id = 0;
        this._interceptors = new Map();
    }

    use(onRequestParams: OnRequestParams): number {
        const nextId = this.id++;

        this._interceptors.set(nextId, onRequestParams);

        return nextId;
    }

    eject(id: number): boolean {
        return this._interceptors.delete(id);
    }
}

export default RequestInterceptorManager;
