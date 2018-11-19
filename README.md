> WIP 
> You won't able to install it at this moment, since I use `yarn link` to get latest version of `ackee-redux-token-auth`.

---

# HTTP Client

Package that uses [axios](https://github.com/axios/axios) for making all HTTP requests and [ackee-redux-token-auth](https://www.npmjs.com/package/ackee-redux-token-auth) for setting access token to HTTP Authorization header.

## Setup

### Create one `httpClient` instance per project

```js
// in config/http-client/index.js
import { create } from 'ackee-http-client';
import config '../config';

const httpClient = HttpClient.create({
    baseURL: config.api.base,

    // default request options pass to axios.create()
    // https://github.com/axios/axios#request-config
});

// 'api' and 'authApi' objects include those same methods
// as instance returned by axios.create()
// https://github.com/axios/axios#creating-an-instance
export const api = httpClient.api;
export const authApi = httpClient.api;
```

### Launch HttpClient saga

```js
import { saga as httpClient } from 'ackee-http-client';

export default function*() {
    yield all([httpClient()]);
}
```

## Usage

### `api` - unauthorized requests

```js
import { api } from 'Config/http-client';

async function fetchTodo(todoId) {
    const response = await authApi.get(`/todos/${todoId}`, {
        // special options for this request
        // https://github.com/axios/axios#request-config

        // overwrite default baseURL
        baseURL: 'https://jsonplaceholder.typicode.com/',
    });
}
```

### `authApi` - authorized requests

Every request created with `authApi` will have access token in its `Authorization` HTTP header. Otherwise `authApi` works exaclty same as the `api`.

So the `authApi` just sets the header, that's all it does. Tokens refreshing, authentication state, etc. is handled by `ackee-redux-token-auth`.
