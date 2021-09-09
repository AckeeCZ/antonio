import type { FinalRequestConfig } from 'modules/request/utils';
import type { IterableStream } from './modules/response/iterableStream';

export type Primitive = bigint | boolean | null | number | string | undefined;

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'HEAD';

export type RequestBodyData = BodyInit | Primitive | object | any[];

export type RequestBody = BodyInit;

/**
 * It defines the format of the returned `data` property in the request result object (`RequestResult`):
 * - `json` -> `data === await response.json()`
 * - `text` -> `data === await response.text()`
 * - ...
 *
 * #### Default behavior based on `Content-Type` header
 *
 * Antonio selects the `responseDataType` by default based on the response `Content-Type` header (its mime type).
 * Based on that it chooses method for formatting the body:
 * - `Content-Type: application/json` refers to `response.json()` method.
 * - `text/*` -> `response.text()` method.
 * - `image/*`, `audio/*`, `video/*`, `application/octet-stream` -> `response.arrayBuffer()`.
 * - `multipart/form-data` -> `response.formData()`
 *
 * Without `Content-Type` or without explicitly defined `responseDataType`, it returns `data` as `null`.
 *
 * #### Exception with `Content-Length` header
 *
 * Note that if the `Content-Length` header is `'0'`, then formatting body is skip completely and `data` are `null`.
 *
 * #### Streaming the response
 * Selecting `iterableStream` response data type fetches data with `ReadableStream`.
 * The `data` is going to be async generator that yields out slices of data.
 * If the `Content-Type` response header has `application/json` mime type,
 * then the received chunk of string from the stream is going to be parsed as json
 * and the `slice` and once a valid json is created, it's yielded out as the `slice`.
 *
 * __Note that both examples are functionally identical.__
 *
 * _#1 Using async generators:_
 * @example
 * ```ts
 * async function* fetchPosts() {
 *   const { data } = yield* api.get('/posts', {
 *       responseDataType: 'iterableStream',
 *   });
 *
 *   for await (const slice of data) {
 *       console.log(slice) // -> [{ title: '1' }, { title: '2' }, ...]
 *   }
 * }
 * ```
 *
 * _#2 Using sync generators:_
 * @example
 * ```ts
 * import { runIterableStream } from `@ackee/antonio-core`;
 *
 * function* fetchPosts() {
 *   const { data } = yield* api.get('/posts', {
 *       responseDataType: 'iterableStream',
 *   });
 *
 *   yield runIterableStream(data, function*(slice) {
 *      console.log(slice) // -> [{ title: '1' }, { title: '2' }, ...]
 *   });
 *  }
 * ```
 */
export type ResponseDataType = 'json' | 'blob' | 'formData' | 'text' | 'arrayBuffer' | 'iterableStream' | 'stream';

export type ResponseData =
    | ArrayBuffer
    | FormData
    | ReadableStream<Uint8Array>
    | ArrayBufferView
    | Blob
    | Primitive
    | object
    | any[]
    | IterableStream
    | null;

export type RequestHeaders =
    | Headers
    | HeadersInit
    | {
          [key: string]: string;
      };

/**
 * @example
 * ```ts
 * const { data } = yield* api.get('/user/:id', {
 *  uriParams: { id: '1' }
 * });
 *
 * console.assert(data.id === '1');
 * ```
 */
export type RequestUriParams = {
    [key: string]: string | number;
};

/**
 * An instace of `URLSearchParams` or a plain object.
 * @example
 * ```ts
 * api.get('/posts', {
 *    params: new URLSearchParams({
 *       page: 1,
 *       limit: 20,
 *    })
 * });
 * ```
 * @example
 * ```ts
 * api.get('/posts', {
 *   params: {
 *     page: 1,
 *     limit: 20,
 *     userIds: [1, 2, 3]
 *   }
 * });
 * ```
 */
export type RequestSearchParams =
    | URLSearchParams
    | {
          [key: string]: string | number | boolean | (string | number | boolean)[];
      };

export interface RequestConfig extends Omit<RequestInit, 'body' | 'headers' | 'method'> {
    /**
     * `baseURL` will be prepended to `url` unless `url` is absolute.
     * It can be convenient to set `baseURL` for an instance of antonio to pass relative URLs.
     */
    baseURL?: string;

    responseDataType?: ResponseDataType;

    uriParams?: RequestUriParams;

    headers?: RequestHeaders;

    params?: RequestSearchParams;

    /**
     * @deprecated This prop is going to be removed in next major relase. Use `signal` prop instead.
     */
    cancelToken?: any;
}

export interface RequestResult<D = any> {
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

export interface RequestParams {
    url: string;
    config: FinalRequestConfig;
    bodyData: RequestBodyData;
}
