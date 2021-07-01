import type { RequestParams } from '../../types';
import type { AntonioError } from '../../modules/response/errors';

interface OnResponseFulfilled {
    (response: Response, request: Request, requestParams: RequestParams):
        | Response
        | Generator<unknown, Response>
        | Promise<Response>;
}

interface OnResponseRejected<TErrorData = any> {
    (error: AntonioError<TErrorData>, request: Request, requestParams: RequestParams): AntonioError<TErrorData>;
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
    _interceptors: ResponseInterceptors;

    constructor() {
        this.id = 0;
        this._interceptors = new Map();
    }

    use(onFulfilled?: OnResponseFulfilled, onRejected?: OnResponseRejected): number {
        const nextId = this.id++;

        this._interceptors.set(nextId, {
            onFulfilled,
            onRejected,
        });

        return nextId;
    }

    eject(id: number): boolean {
        return this._interceptors.delete(id);
    }
}

export default ResponseInterceptorManager;
