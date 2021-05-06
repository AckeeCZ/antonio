# `@ackee/antonio-utils`

Custom Saga effects with built-in cancelation of API requests.

## Table of contents

-   [Install](#install)
-   [API](#api)

    -   Effect creators

        -   [`takeRequest`](#api-takeRequest)
        -   [`takeLatestRequest`](#api-takeLatestRequest)

    -   Auth utils
        -   [`setAuthHeader`](#setAuthHeader)

---

## <a name="install"></a>Install

```bash
yarn add @ackee/antonio-utils -S
```

---

## <a name="api"></a>API Reference

### <a name="api-takeRequest"></a>`takeRequest(actionTypes: Object, saga: Function)`

#### Parameters

-   `actionTypes: Object`
    -   `REQUEST: String` - action type that launches the saga
    -   `CANCEL: String` - action type that aborts the running saga
-   `saga(requestAction, cancelToken): Function` - the actual API request is made here

#### Example

```js
import { takeRequest } from '@ackee/antonio-utils';

export default function* () {
    // Works same as the Redux saga take effect, but on top of that, it cancels the API request.
    yield takeRequest(
        {
            REQUEST: 'FETCH_TODO_ITEM_REQUEST',
            CANCEL: 'FETCH_TODO_ITEM_INVALIDATE',
        },
        fetchTodoItem,
    );
}
```

---

### <a name="api-takeLatestRequest"></a>`takeLatestRequest(params: Object, saga: Function)`

#### Parameters

-   `params: Object`
    -   `REQUEST: String` - action type that launches the saga
    -   `cancelTask: Function` - Redux action that will cancel the
        running saga
    -   `requestIdSelector: Function` (optional) - A function that receives request action as 1st arg. and returns unique ID of this action, e.g. user ID.
-   `saga(requestAction, cancelToken): Function` - the actual API request is made here

#### Example

```js
import { takeLatestRequest } from '@ackee/antonio-utils';

// The 'cancelToken' must be passed to the request config object:
function* fetchTodoItem(requestAction, cancelToken) {
    const response = yield api.get(`todos/1`, {
        cancelToken,
    });

    return response.data;
}

const fetchTodoItemInvalidate = () => ({
    type: 'FETCH_TODO_ITEM_INVALIDATE',
});

export default function* () {
    // Works same as the Redux saga takeLatest effect, but on top of that, it cancels the API request.
    yield takeLatestRequest(
        {
            REQUEST: 'FETCH_TODO_ITEM_REQUEST',
            cancelTask: fetchTodoItemInvalidate,
        },
        fetchTodoItem,
    );
}
```

### Example - take latest request for certain user

If `requestIdSelector` function provided, instead of cancelling of all previous requests and taking only the last one for certain action type, take the lastest request for certain user, i.e. **identify the request by action type and by an ID**.

```js
import { takeLatestRequest } from '@ackee/antonio-utils';

// The 'cancelToken' must be passed to the request config object:
function* fetchUser(requestAction, cancelToken) {
    const { userId } = requestAction;
    const response = yield api.get(`users/${userId}`, {
        cancelToken,
    });

    return response.data;
}

const fetchUserInvalidate = userId => ({
    type: 'FETCH_USER_INVALIDATE',
    userId,
});

export default function* () {
    // Works same as the Redux saga takeLatest effect, but on top of that, it cancels the API request.
    yield takeLatestRequest(
        {
            REQUEST: 'FETCH_USER_REQUEST',
            cancelTask: fetchUserInvalidate,
            requestIdSelector: action => action.userId,
        },
        fetchUser,
    );
}
```

---

### <a name="setAuthHeader"></a>`setAuthHeader(headers: Headers, tokenValue?: string, tokenType: TokenType | string = TokenType.Bearer): void`

Sets or deletes the `Authorization` header with provided `tokenType` and `tokenValue`:

```js
const accessToken = 'eqwo123490ewqj123njir43';
const headers = new Headers();

setAuthHeader(headers, accessToken);

console.assert(headers.get('Authorization') === `Bearer eqwo123490ewqj123njir43`);
```
