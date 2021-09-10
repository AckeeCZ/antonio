![ackee|Antonio](/assets/ackee_git_frontend_antonio.png)

# [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/AckeeCZ/antonio/blob/master/LICENSE) [![CI Status](https://img.shields.io/travis/com/AckeeCZ/antonio.svg?style=flat)](https://travis-ci.com/AckeeCZ/antonio) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://reactjs.org/docs/how-to-contribute.html#your-first-pull-request) [![Dependency Status](https://img.shields.io/david/AckeeCZ/antonio.svg?style=flat-square)](https://david-dm.org/AckeeCZ/antonio) [![bundlephobia](https://flat.badgen.net/bundlephobia/min/@ackee/antonio-core)](https://bundlephobia.com/result?p=@ackee/antonio-core) [![bundlephobia](https://flat.badgen.net/bundlephobia/minzip/@ackee/antonio-core)](https://bundlephobia.com/result?p=@ackee/antonio-core) ![node version](https://img.shields.io/node/v/@ackee/antonio-core)

# `@ackee/antonio-core`

HTTP client built on Fetch API.

## Table of contents

-   [Install](#install)
-   [Usage](#usage)
-   [API](./docs/modules.md)

---

## <a name="install"></a>Install

```bash
yarn add @ackee/antonio-core -S
```

---

## <a name="usage"></a>Usage

```js
import { Antonio } from '@ackee/antonio-core';

const api = new Antonio({
    baseURL: 'https://jsonplaceholder.typicode.com/',
});

function* fetchTodos() {
    // Since api.get returns generator function, `yield*` is required.
    const { data, request, response } = yield* api.get('/todos', {
        params: {
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
```

## <a name="api-general-config"></a>`generalConfig: GeneralConfig`

Optional `@ackee/antonio-core` configuration:

```ts
{
    // Default is [`loglevel`](https://www.npmjs.com/package/loglevel)
    logger: loglevel,
}
```
