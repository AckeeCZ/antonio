![ackee|Antonio](/assets/ackee_git_frontend_antonio.png)

# [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/AckeeCZ/antonio/blob/master/LICENSE) [![CI Status](https://img.shields.io/travis/com/AckeeCZ/antonio.svg?style=flat)](https://travis-ci.com/AckeeCZ/antonio) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://reactjs.org/docs/how-to-contribute.html#your-first-pull-request) [![Dependency Status](https://img.shields.io/david/AckeeCZ/antonio.svg?style=flat-square)](https://david-dm.org/AckeeCZ/antonio) [![bundlephobia](https://flat.badgen.net/bundlephobia/min/@ackee/antonio-core)](https://bundlephobia.com/result?p=@ackee/antonio-core) [![bundlephobia](https://flat.badgen.net/bundlephobia/minzip/@ackee/antonio-core)](https://bundlephobia.com/result?p=@ackee/antonio-core) ![node version](https://img.shields.io/node/v/@ackee/antonio-core)

# `@ackee/antonio-core`

HTTP client built on Fetch API with similar API to [axios](https://github.com/axios/axios).

## Table of contents

-   [Install](#install)
-   [Setup](#setup)
-   [API](./docs-api/modules.md)
-   Guides
    -   [Request & Response interceptors](./docs/interceptors.md)

---

## <a name="install"></a>Install

```bash
yarn add @ackee/antonio-core -S
```

---

## <a name="setup"></a>Setup

```js
import { Antonio, detroy } from '@ackee/antonio-core';

export const api = new Antonio({
    baseURL: 'https://jsonplaceholder.typicode.com/',
});
```

## Usage Examples

```js
import { api } from '...';

function* fetchTodos() {
    // Note the `yield*` instead of just `yield`: it makes TS types auto-completion work
    const { data, request, response } = yield* api.get('/todos', {
        searchParams: {
            page: 1,
            limit: 20,
        },
    });
}
```

---

## <a name="api"></a>API

### <a name="api-create"></a>`new Antonio(requestConfig?: RequestConfig, generalConfig?: GeneralConfig)`

Creates a new instance of `Antonio` with custom request config and general config:

```ts
import { Antonio } from '@ackee/antonio-core';

const api = new Antonio({
    baseURL: 'https://some-domain.com/api/',
});
```

#### Instance methods

```ts
api.get(url: string, requestConfig?: RequestConfig): Generator<any, RequestResult>

api.delete(url: string, requestConfig?: RequestConfig): Generator<any, RequestResult>

api.head(url: string, requestConfig?: RequestConfig): Generator<any, RequestResult>

api.options(url: string, requestConfig?: RequestConfig): Generator<any, RequestResult>

api.post(url: string, data: RequestBody, requestConfig?: RequestConfig): Generator<any, RequestResult>

api.put(url: string, data: RequestBody, requestConfig?: RequestConfig): Generator<any, RequestResult>

api.patch(url: string, data: RequestBody, requestConfig?: RequestConfig): Generator<any, RequestResult>

// It clears up memory after the current Antonio instance.
api.destroy();
```

## <a name="api-request-config"></a>`requestConfig: RequestConfig`

_Optional_ request config options:

```ts
{
    // Default: undefined
    baseUrl: 'https://jsonplaceholder.typicode.com/',

    // Options: "json" | "blob" | "text" | "formData" | 'arrayBuffer' | 'stream' \ 'iterableStream' | undefined | null
    // Default: undefined
    responseDataType: undefined',

    // Options: object | undefined
    // Default: undefined
    uriParams: {
        id: '2',
    },

    // `headers` are custom headers to be sent
    // Must be a plain object or a Headers object
    // Default: new Headers()
    headers: new Headers({
        'X-Custom-Header': 1234,
    }),

    // `params` are the URL parameters to be sent with the request
    // Must be a plain object or a URLSearchParams object
    // Default: undefined
    params: new URLSearchParams({
        query: 'foo',
    }),

    // Following props are pass to Request constructor,
    // see the official docs https://developer.mozilla.org/en-US/docs/Web/API/Request/Request
    mode: undefined,
    credentials: undefined,
    cache: undefined,
    redirect: undefined,
    referrer: undefined,
    referrerPolicy: undefined,
    integrity: undefined,
    keepalive: undefined,
    signal: undefined,
}
```

## <a name="api-general-config"></a>`generalConfig: GeneralConfig`

Optional `@ackee/antonio-core` configuration:

```ts
{
    // Default is [`loglevel`](https://www.npmjs.com/package/loglevel)
    logger: loglevel,
}
```
