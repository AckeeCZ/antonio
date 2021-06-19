export type {
    RequestConfig,
    RequestResult,
    RequestSearchParams,
    RequestUriParams,
    RequestHeaders,
    ResponseDataType,
    FullRequestConfig,
    RequestBodyData,
    ResponseData,
} from './types';
export type { GeneralConfig } from './modules/core/general-config';
export type { ResolverType } from './modules/core/constants';
export { Antonio } from './modules/core/models/Antonio';
export { resolverTypes } from './modules/core';
export type { AntonioError } from './modules/response/errors';
export { runIterableStream } from './modules/response/utils';
