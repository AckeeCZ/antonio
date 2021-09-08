export type {
    RequestConfig,
    RequestResult,
    RequestSearchParams,
    RequestUriParams,
    RequestHeaders,
    ResponseDataType,
    RequestBodyData,
    ResponseData,
    RequestParams,
} from './types';
export type { GeneralConfig } from './modules/core/general-config';
export { Antonio, generatorToPromise } from './modules/core';
export { AntonioError, isAntonioError } from './modules/response/errors';
export { runIterableStream } from './modules/response/utils';
