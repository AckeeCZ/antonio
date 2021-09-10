![ackee|Antonio](/assets/ackee_git_frontend_antonio.png)

# [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/AckeeCZ/antonio/blob/master/LICENSE) [![CI Status](https://img.shields.io/travis/com/AckeeCZ/antonio.svg?style=flat)](https://travis-ci.com/AckeeCZ/antonio) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://reactjs.org/docs/how-to-contribute.html#your-first-pull-request) [![Dependency Status](https://img.shields.io/david/AckeeCZ/antonio.svg?style=flat-square)](https://david-dm.org/AckeeCZ/antonio) [![bundlephobia](https://flat.badgen.net/bundlephobia/min/@ackee/antonio-auth)](https://bundlephobia.com/result?p=@ackee/antonio-auth) [![bundlephobia](https://flat.badgen.net/bundlephobia/minzip/@ackee/antonio-auth)](https://bundlephobia.com/result?p=@ackee/antonio-auth) ![node version](https://img.shields.io/node/v/@ackee/antonio-auth) ![@ackee/petrus min required version](https://img.shields.io/npm/dependency-version/@ackee/antonio-auth/peer/@ackee/petrus)

# `@ackee/antonio-auth`

It includes a request interceptor for `@ackee/antonio-core` that sets the `Authorization` header with an access token obtained from `getAccessToken` from `@ackee/petrus`.

## Table of contents

-   [Install](#install)
-   [API](#api)
-   [API (TypeDoc)](./docs)

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
import { Antonio } from '@ackee/antonio-core';
import { requestAuthHeaderInterceptor } from '@ackee/antonio-auth';

const api = new Antonio({
    baseURL: '...',
});

api.interceptors.request.use(null, requestAuthHeaderInterceptor);
```

#### Custom usage example (without @ackee/petrus)

```js
import { Antonio } from '@ackee/antonio-core';
import { setAuthHeader } from '@ackee/antonio-utils';

const api = new Antonio({
    baseURL: '...',
});

function* getAccessToken() {
    // Your custom function for obtaining the access token.
}

api.interceptors.request.use(null, function* (request) {
    const accessToken = yield getAccessToken();

    setAuthHeader(requst.headers, accessToken);

    return request;
});
```
