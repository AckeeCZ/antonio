import type { IterableStream } from './modules/response/iterableStream';

export type Primitive = bigint | boolean | null | number | string | undefined;

export type PlainObject = Record<string, Primitive | any[]>;

export type RequestMethod = 'get' | 'post' | 'put' | 'PATCH' | 'delete' | 'options' | 'head';

export type RequestBodyData = BodyInit | Primitive | PlainObject | any[];

export type RequestBody = BodyInit;

export type ResponseDataType = 'json' | 'blob' | 'formData' | 'text' | 'arrayBuffer' | 'iterableStream' | 'stream';

export type ResponseData =
    | ArrayBuffer
    | FormData
    | ReadableStream<Uint8Array>
    | ArrayBufferView
    | Blob
    | Primitive
    | PlainObject
    | any[]
    | IterableStream
    | null;

interface Params {
    [key: string]: string;
}

export type RequestHeaders = Headers | HeadersInit | Params;

export type RequestUriParams = Params;

export type RequestSearchParams = URLSearchParams | Params;

export interface FullRequestConfig extends Omit<RequestInit, 'body' | 'headers' | 'method'> {
    // `baseURL` will be prepended to `url` unless `url` is absolute.
    // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
    // to methods of that instance.
    baseURL: string;

    responseDataType: ResponseDataType;

    uriParams: RequestUriParams;

    headers: RequestHeaders;

    params: RequestSearchParams;
}

export type RequestConfig = Partial<FullRequestConfig> & {
    /**
     * @deprecated This prop is going to be removed in next major relase. Use `signal` prop instead.
     */
    cancelToken?: AbortSignal;
};

export interface RequestResult<D = ResponseData> {
    request: Request;
    response: Response;
    data: D;

    /**
     * @deprecated This prop is going to be removed in next major relase. Use `response.status` instead.
     */
    status: number;

    /**
     * @deprecated This prop is going to be removed in next major relase. Use `response.statusText` instead.
     */
    statusText: string;

    /**
     * @deprecated This prop is going to be removed in next major relase. Use `response.headers` instead.
     */
    headers: {};

    /**
     * @deprecated This prop is going to be removed in next major relase. Depend on properties in the `request`.
     */
    config: {};
}
