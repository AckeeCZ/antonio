import type { Logger } from 'loglevel';
import type { IterableStream } from './modules/core/utils/response';

export type RequestMethod = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'options' | 'head';

export type ResponseType = 'json' | 'blob' | 'formData' | 'text' | 'arrayBuffer' | 'iterableStream' | 'stream';

export type ResponseTypes = Record<ResponseType, string>;

export type ResponseData = BodyInit | null | IterableStream;

interface Params {
    [key: string]: string;
}

export type RequestHeaders = Headers | HeadersInit | Params;

export type RequestUriParams = Params;

export type RequestSearchParams = URLSearchParams | Params;

export const enum Header {
    CONTENT_TYPE = 'Content-Type',
}

export type ResolverType = 'generator' | 'promise';

export interface ResolverTypes {
    GENERATOR: 'generator';
    PROMISE: 'promise';
}
export interface FullRequestConfig extends Omit<RequestInit, 'body' | 'headers' | 'method'> {
    // `baseURL` will be prepended to `url` unless `url` is absolute.
    // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
    // to methods of that instance.
    baseURL: string;

    responseType: ResponseType;

    uriParams: RequestUriParams;

    headers: RequestHeaders;

    searchParams: RequestSearchParams;

    /**
     * @deprecated This prop is going to be removed in next major relase. Use `searchParams` prop instead.
     */
    params: RequestSearchParams;
}

export type RequestConfig = Partial<FullRequestConfig> & {
    /**
     * @deprecated This prop is going to be removed in next major relase. Use `signal` prop instead.
     */
    cancelToken?: AbortSignal;
};

export interface GeneralConfig {
    logger: Logger;
    resolverType: ResolverType;
}

export interface RequestResult {
    request: Request;
    response: Response;
    data: ResponseData;

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
