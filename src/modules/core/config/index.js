import { ResponseType, RequestConfigFields } from '../constants';

export const RequestConfig = {
    // `baseURL` will be prepended to `url` unless `url` is absolute.
    // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
    // to methods of that instance.
    [RequestConfigFields.BASE_URL]: undefined,

    [RequestConfigFields.RESPONSE_TYPE]: ResponseType.JSON,

    [RequestConfigFields.URI_PARAMS]: undefined,

    // `headers` are custom headers to be sent
    [RequestConfigFields.HEADERS]: undefined,

    // `params` are the URL parameters to be sent with the request
    // Must be a plain object or a URLSearchParams object
    [RequestConfigFields.SEARCH_PARAMS]: undefined,

    [RequestConfigFields.MODE]: undefined,
    [RequestConfigFields.CREDENTIALS]: undefined,
    [RequestConfigFields.CACHE]: undefined,
    [RequestConfigFields.REDIRECT]: undefined,
    [RequestConfigFields.REFERRER]: undefined,
    [RequestConfigFields.REFERRER_POLICY]: undefined,
    [RequestConfigFields.INTEGRITY]: undefined,
    [RequestConfigFields.KEEPALIVE]: undefined,
    [RequestConfigFields.SIGNAL]: undefined,
};
