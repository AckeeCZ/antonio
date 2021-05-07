import type { Logger } from 'loglevel';

export type RequestMethod = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'options' | 'head';

export type ResponseType = 'json' | 'blob' | 'formData' | 'text';

export type RequestBody = BodyInit | any;

interface Params {
    [key: string]: string;
}

export type RequestHeaders = Headers | HeadersInit | Params;

export type RequestUriParams = Params;

export type RequestSearchParams = URLSearchParams | Params;

export enum ResponseTypes {
    json = 'application/json',
    text = 'text/*',
    formData = 'multipart/form-data',
    blob = '*/*',
}

export enum Header {
    CONTENT_TYPE = 'Content-Type',
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
}

export interface RequestResult {
    request: Request;
    response: Response;
    data: BodyInit | null;

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
