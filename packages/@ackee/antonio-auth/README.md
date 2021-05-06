# `@ackee/antonio-auth`

It includes a request interceptor for `@ackee/antonio-core` that sets the `Authorization` header with an access token obtained from `getAccessToken` from `@ackee/petrus`.

## Install

```bash
yarn add @ackee/antonio-auth -S

# Check you have installed at least these dependencies' versions:
yarn add @ackee/petrus@5.2.1
```

## API

### `requestAuthHeaderInterceptor(request: Request): Request`

A request interceptor that sets the `Authorization` header with `setAuthHeader` from `@ackee/antonio-utils` and obtained from `getAccessToken` from `@ackee/petrus`.

#### Default usage example

```js
import { create } from '@ackee/antonio-core';
import { requestAuthHeaderInterceptor } from '@ackee/antonio-auth';

const api = create({
    baseURL: '...',
});

api.interceptors.request.use(requestAuthHeaderInterceptor);
```

#### Custom usage example (without @ackee/petrus)

```js
import { create } from '@ackee/antonio-core';
import { setAuthHeader } from '@ackee/antonio-utils';

const api = create({
    baseURL: '...',
});

function* getAccessToken() {
    // Your custom function for obtaining the access token.
}

api.interceptors.request.use(function* (request) {
    const accessToken = yield getAccessToken();

    setAuthHeader(requst.headers, accessToken);

    return request;
});
```
