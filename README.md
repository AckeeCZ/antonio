# [WIP] HTTP Client

The HTTP client uses [axios](https://github.com/axios/axios) for making all HTTP requests and [ackee-redux-token-auth](https://www.npmjs.com/package/ackee-redux-token-auth) for setting a access token to HTTP Authorization header.

## Table of contents

-   [Installing](#installing)
-   [Initialization](#initialization)
-   [API](#api)
    -   [create](#api-create)
    -   [saga](#api-saga)

---

## <a name="installing"></a>Installing

Using yarn:

```bash
$ yarn add ackee-http-client
```

Using npm:

```bash
$ npm install ackee-http-client
```

---

## <a name="initialization"></a>Initialization

Initialization is a simple 2 steps process.

First you will create new instance of `HttpClient`, which gives you `api` and `authApi` objects. Then you will launch a `httpClient`'s saga. That's all.

### 1. Create `httpClient` instance

Create one `httpClient` instance object per project.

```js
import { create } from 'ackee-http-client';

const httpClient = create({
    baseURL: 'https://base-url.com/api/',
});

export const api = httpClient.api;
export const authApi = httpClient.api;
```

### 2. Launch HttpClient saga

```js
import { saga as httpClient } from 'ackee-http-client';

export default function*() {
    yield all([httpClient()]);
}
```

## <a name="usage"></a>Usage

### `api` - unauthorized requests

See [available properties](#api-create-http-client) of the `api` object.

```js
import { api } from 'Config/http-client';

async function fetchTodo(todoId) {
    const response = await api.get(`/todos/${todoId}`, {
        // special options for this request
        // https://github.com/axios/axios#request-config

        // overwrite default baseURL
        baseURL: 'https://jsonplaceholder.typicode.com/',
    });

    return response.data;
}
```

### `authApi` - authorized requests

By using methods under `authApi` object, it's guarantee that each HTTP request is going to have access token in its `Authorization` header.

See [available properties](#api-create-http-client) of the `authApi` object.

```js
import { authApi } from 'Config/http-client';

async function fetchPost(postId) {
    const response = await authApi.get(`/posts/${postId}`);

    return response.data;
}
```

---

## <a name="api"></a>API

### <a name="api-create"></a>`create(axiosRequestConfig: Object, customConfig: Object) => httpClient:Object`

This method receives two objects as arguments.

-   `axiosRequestConfig`

    The `axiosRequestConfig` is reserved for axios default request configuration, see [available options](https://github.com/axios/axios#request-config).

-   `customConfig`

    The `customConfig` object offers following default options:

    ```js
    {
        // If `managaAuthHeader` is true, then when access token state changes,
        // the `setAuthHeader` is triggered.
        // If it's false, `setAuthHeader` won't be ever triggered.
        managaAuthHeader: true,

        // If `managaAuthHeader` is enabled, `setAuthHeader` receives object with default headers,
        // when access token state changes.
        /**
         * @param {Object} headers - reference to axios default request headers object (https://github.com/axios/axios#custom-instance-defaults)
         * @param {String|null} accessToken
         */
        setAuthHeader(headers, accessToken) {
            if (accessToken) {
                // `common` indicates that it's a default header for all HTTP methods
                headers.common.Authorization = `Bearer ${accessToken}`;
            } else {
                delete headers.common.Authorization;
            }
        }
    }
    ```

-   <a name="api-create-http-client"></a>`httpClient`

    The `httpClient` object contains two axios instances: `api` and `authApi` with the same properties:

    -   `api.request(config)`
    -   `api.get(url[, config])`
    -   `api.delete(url[, config])`
    -   `api.head(url[, config])`
    -   `api.options(url[, config])`
    -   `api.post(url[, data[, config]])`
    -   `api.put(url[, data[, config]])`
    -   `api.patch(url[, data[, config]])`
    -   `api.getUri([config])`
    -   [`api.defaults`](https://github.com/axios/axios#custom-instance-defaults)
    -   [`api.interceptors`](https://github.com/axios/axios#interceptors)

#### Example

```js
import { create } from 'ackee-http-client';

const { api, authApi } = create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
});

async function fetchTodo() {
    const response = await api.get('/todos/1');

    console.log(response.data);
}
```

### <a name="api-saga"></a>`saga(void) => ReduxSaga`

Initializes the saga handlers generator. This should be passed along with your other sagas.

#### Example

```js
import { all } from 'redux-saga/effects';
import { saga as httpClient } from 'ackee-http-client';

export default function*() {
    yield all([httpClient()]);
}
```
