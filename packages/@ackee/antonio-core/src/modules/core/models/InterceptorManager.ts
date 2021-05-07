import type { RequestConfig } from '../../../types';

export const interceptors = new WeakMap();

let id = 0;

class InterceptorManager<V, C> {
    constructor() {
        interceptors.set(this, new Map());
    }

    use(
        onFulfilled?: (value: V, config: C) => V | IterableIterator<V>,
        onRejected?: (error: any, config: C) => any,
    ): number {
        const nextId = id++;

        interceptors.get(this).set(nextId, {
            onFulfilled,
            onRejected,
        });

        return nextId;
    }

    eject(id: number): boolean {
        return interceptors.get(this).delete(id);
    }
}

interface InterceptorsEntry<V, C> {
    onFulfilled?: (value: V, config: C) => V | IterableIterator<V>;
    onRejected?: (error: any, config: C) => any;
}

export type RequestInterceptorsEntries = Map<number, InterceptorsEntry<Request, RequestConfig>>;
export type ResponseInterceptorsEntries = Map<number, InterceptorsEntry<Response, RequestConfig>>;

export interface InterceptorManagers {
    request: InterceptorManager<Request, RequestConfig>;
    response: InterceptorManager<Response, RequestConfig>;
}

export default InterceptorManager;
