export const interceptors = new WeakMap();

let id = 0;

class InterceptorManager<V> {
    constructor() {
        interceptors.set(this, new Map());
    }

    use(onFulfilled?: (value: V) => V | IterableIterator<V>, onRejected?: (error: any) => any): number {
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

interface InterceptorsEntry<V> {
    onFulfilled?: (value: V) => V | IterableIterator<V>;
    onRejected?: (error: any) => any;
}

export type RequestInterceptorsEntries = Map<number, InterceptorsEntry<Request>>;
export type ResponseInterceptorsEntries = Map<number, InterceptorsEntry<Response>>;

export interface InterceptorManagers {
    request: InterceptorManager<Request>;
    response: InterceptorManager<Response>;
}

export default InterceptorManager;
