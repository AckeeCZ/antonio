export const Methods = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    PATCH: 'patch',
    DELETE: 'delete',
    OPTIONS: 'options',
    HEAD: 'head',
};

export const ResponseType = {
    JSON: 'json',
    BLOB: 'blob',
    FORM_DATA: 'formData',
    TEXT: 'text',
};

export const ResponseTypes = {
    [ResponseType.JSON]: 'application/json',
    [ResponseType.TEXT]: 'text/*',
    [ResponseType.FORM_DATA]: 'multipart/form-data',
    [ResponseType.BLOB]: '*/*',
};

export const Header = {
    CONTENT_TYPE: 'Content-Type',
};

export const RequestConfigFields = {
    BASE_URL: 'baseURL',
    RESPONSE_TYPE: 'responseType',
    URI_PARAMS: 'uriParams',
    HEADERS: 'headers',
    SEARCH_PARAMS: 'searchParams',
    MODE: 'mode',
    CREDENTIALS: 'credentials',
    CACHE: 'cache',
    REDIRECT: 'redirect',
    REFERRER: 'referrer',
    REFERRER_POLICY: 'referrerPolicy',
    INTEGRITY: 'integrity',
    KEEPALIVE: 'keepalive',
    SIGNAL: 'signal',
};
