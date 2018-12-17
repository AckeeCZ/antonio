![ackee|Antonio](https://img.ack.ee/ackee/image/github/js)

# Antonio

A HTTP client that uses [axios](https://github.com/axios/axios) for making all HTTP requests and [@ackee/petrus](https://www.npmjs.com/package/@ackee/petrus) for adding an access token to the Authorization header.

## Table of contents

-   [Installing](#installing)
-   [Initialization](#initialization)
-   [API](#api)
    -   [create](#api-create)
    -   [Saga Effects](#api-saga-effects)

---

## <a name="installing"></a>Installing

Using yarn:

```bash
$ yarn add @ackee/antonio
```

Using npm:

```bash
$ npm i -S @ackee/antonio
```

---

## <a name="initialization"></a>Initialization

### 1. Create new instance 

```js
import * as Antonio from '@ackee/antonio';

const defaultRequestConfig = {
    baseURL: 'https://base-url.com/api',
};

const { api, authApi, saga } = Antonio.create(defaultRequestConfig);

export { api, authApi, saga };
```

### 2. Connect the saga
Initializes the saga handlers generator. This should be passed along with your other sagas.

```js
import { saga as antonio } from 'Config/antonio';

export default function*() {
    // antonio's saga must come before @ackee/petrus saga
    yield all([antonio()]);
}
```

## <a name="usage"></a>Usage

### `api` - unauthorized requests

See [available properties](#api-create-http-client) of the `api` object.

```js
import { api } from 'Config/antonio';

function* fetchTodo(todoId) {
    const response = yield api.get('/todos/:todoId', {
        // overwrite the default baseURL
        baseURL: 'https://jsonplaceholder.typicode.com/',
        uriParams: {
            todoId,
        },
    });

    return response.data;
}
```

### `authApi` - authorized requests

By using methods under `authApi` object, it's guaranteed that each HTTP request is going to have an access token in its `Authorization` header.

If the access token isn't available at the moment, the request is paused by `take(ACCESS_TOKEN_AVAILABLE)` effect, and timeout, if enabled, is set. See the [`accessTokenUnavailableTimeout`](#api-create-customConfig) for more details.

See [available properties](#api-create-http-client) of the `authApi` object.

```js
import { authApi } from 'Config/antonio';

function* fetchPost(postId) {
    const response = yield authApi.get(`/posts/${postId}`);

    return response.data;
}
```

> ### Shared `defaults`
>
> Even though `api` and `authApi` are created as separated axios instances, they share the same default request config object - [`api.defaults` and `authApi.defaults`](https://github.com/axios/axios#request-config). This issue/feature is caused by how axios is implemented and `@ackee/antonio` won't change it. Just don't be surprised, when you see the `Authorization` header also in requests created by the `api`.

---

## <a name="api"></a>API

### <a name="api-create"></a>`create(defaultRequestConfig: Object, customConfig: Object) => Object`

This method receives two objects as arguments.

-   `defaultRequestConfig: Object`

    The `defaultRequestConfig` object is passed to axios as default request configuration. 
    
    __Available properties__:
    - [axios request config](https://github.com/axios/axios#request-config)   
    - additional props:
        ```js
        // `uriParams` - Key-value object containing request uri params. Params that are found in url are replaced, rest is ignored.
        uriParams: {
            // ':todoId' will be replaced with '1'
            // '/todos/:todoId' -> '/todos/1'
            todoId: '1',
        },
        ```

-   <a name="api-create-customConfig"></a>`customConfig: Object`

    The `customConfig` object offers following default options:

    ```js
    {
        // If `manageAuthHeader` is true, then when access token state changes,
        // the `setAuthHeader` is triggered.
        // If it's false, `setAuthHeader` won't be ever triggered.
        manageAuthHeader: true,

        /**
         * If `manageAuthHeader` is enabled, `setAuthHeader` receives
         * object with default headers, when access token state changes.
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
        },

        // If it's used `authApi` and access token isn't available,
        // there is optionable timeout with following default values:
        accessTokenUnavailableTimeout: {
            // enable / disable the timeout
            enabled: false,
            // set timeout duration for 30s
            duration: 1000 * 30,
            // if silent is true, then throw a custom error,
            // othewise API request will be made that fails,
            // and throws a server error
            silent: false,
        },
    }
    ```

#### And returns:

-   <a name="api-create-http-client"></a>`Object`

    #### `api`, `authApi`

    `api` and `authApi` have the same following properties:

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

    #### `saga`
    Internal saga, primarily for communication with [`@ackee/petrus`](https://github.com/AckeeCZ/petrus).

#### Example

```js
import * as Antonio from '@ackee/antonio';

const { authApi } = Antonio.create(
    {
        baseURL: 'https://jsonplaceholder.typicode.com/',
    },
    {
        // Customize setting of the authorization header
        // by providing a custom setAuthHeader method:
        setAuthHeader(headers, accessToken) {
            if (accessToken) {
                headers.common.Authorization = accessToken;
            } else {
                delete headers.common.Authorization;
            }
        },
    },
);

async function fetchTodo() {
    const response = await authApi.get('/todos/1');

    return response.data;
}
```

### <a name="api-saga-effects"></a> Saga Effects

Custom Saga effects with built-in cancelation of API requests, [see the docs](src/saga-effects/saga-effects.md).
