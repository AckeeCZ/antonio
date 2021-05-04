![ackee|Antonio](/assets/ackee_git_frontend_antonio.png)

# [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/AckeeCZ/antonio/blob/master/LICENSE) [![CI Status](https://img.shields.io/travis/com/AckeeCZ/antonio.svg?style=flat)](https://travis-ci.com/AckeeCZ/antonio) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://reactjs.org/docs/how-to-contribute.html#your-first-pull-request) [![Dependency Status](https://img.shields.io/david/AckeeCZ/antonio.svg?style=flat-square)](https://david-dm.org/AckeeCZ/antonio) [![bundlephobia](https://flat.badgen.net/bundlephobia/min/@ackee/antonio-core)](https://bundlephobia.com/result?p=@ackee/antonio-core) [![bundlephobia](https://flat.badgen.net/bundlephobia/minzip/@ackee/antonio-core)](https://bundlephobia.com/result?p=@ackee/antonio-core)

# `@ackee/antonio-core`

A HTTP client built on Fetch API with similar API to [axios](https://github.com/axios/axios).

## Table of contents

-   [Install](#install)
-   [Setup](#setup)
-   [API](#api)
    -   [`create(requestConfig?: RequestConfig, generalConfig?: GeneralConfig): Antonio`](#create)
    -   [`destroy(api: Antonio): void`](#destroy)
    -   [`requestConfig: RequestConfig`](#request-config)
    -   [`generalConfig: GeneralConfig`](#general-config)

---

## <a name="install"></a>Install

```bash
yarn add @ackee/antonio-core -S
```

---

## <a name="setup"></a>Setup

```js
import { create } from '@ackee/antonio-core';

export const api = create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
});
```

## Usage Examples

```js
import { api } from '...';

api.get('/todos').then(({ data, request, response }) => {
    // ...
});

api.post('/todos', {
    title: 'Lorem ipsum',
});

api.put(
    '/todos/:id',
    {
        title: 'Not lorem ipsum',
    },
    {
        uriParams: {
            id: '2',
        },
    },
);

api.get('/todos/:id', {
    uriParams: {
        id: '2',
    },
});

api.delete('/todos/:id', {
    uriParams: '2',
});
```

---

## <a name="api"></a>API

### `create(requestConfig?: RequestConfig, generalConfig?: GeneralConfig): Antonio`

Creates a new instance of `Antonio` with custom request config and general config:

```ts
import { create } from '@ackee/antonio-core';

const api = create({
    baseURL: 'https://some-domain.com/api/',
});
```

#### Instance methods

```ts
api.get(url: string, requestConfig?: RequestConfig): Promise<RequestResult>

api.delete(url: string, requestConfig?: RequestConfig): Promise<RequestResult>

api.head(url: string, requestConfig?: RequestConfig): Promise<RequestResult>

api.options(url: string, requestConfig?: RequestConfig): Promise<RequestResult>

api.post(url: string, data: RequestBody, requestConfig?: RequestConfig): Promise<RequestResult>

api.put(url: string, data: RequestBody, requestConfig?: RequestConfig): Promise<RequestResult>

api.patch(url: string, data: RequestBody, requestConfig?: RequestConfig): Promise<RequestResult>
```

### `destroy(api: Antonio): void`

Clears-up memory after the current Antonio instance.

```ts
import { destroy } from '@ackee/antonio-core';
import { api } from '...';

destroy(api);
```

## `requestConfig: RequestConfig`

These are the available config options for an API request. None of these are required.

```ts
{
    // `baseURL` will be prepended to `url` unless `url` is absolute.
    // It can be convenient to set `baseURL` for an instance of antonio to pass relative URLs
    // to methods of that instance.
    // Default: undefined
    baseUrl: 'https://jsonplaceholder.typicode.com/',

    // Options: "json" | "blob" | "text" | "formData" | undefined
    // Default: "json"
    responseType: 'json',

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

    // `searchParams` are the URL parameters to be sent with the request
    // Must be a plain object or a URLSearchParams object
    // Default: undefined
    searchParams: new URLSearchParams({
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

## `generalConfig: GeneralConfig`

```ts
{
    logger: loglevel,
}
```
