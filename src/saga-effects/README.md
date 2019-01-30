# Custom Saga Effects

Custom Saga effects with built-in cancelation of API requests.

## Table of contents

-   API Reference

    -   Effect creators

        -   [`takeRequest(actionTypes, saga)`](#api-takeRequest)
        -   [`takeLatestRequest(params, saga)`](#api-takeLatestRequest)

    -   Low-level
        -   [`cancelableHandler(params)`](#api-cancelableHandler)

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
import { create } from '@ackee/antonio';
import { takeRequest } from '@ackee/antonio/es/saga-effects';

// create antonio instance
const { api } = create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
});

// The 'cancelToken' must be passed to the request config object:
function* fetchTodoItem(requestAction, cancelToken) {
    const response = yield api.get(`todos/1`, {
        cancelToken,
    });

    return response.data;
}

export default function*() {
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
import { create } from '@ackee/antonio';
import { takeLatestRequest } from '@ackee/antonio/es/saga-effects';

// create antonio instance
const { api } = create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
});

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

export default function*() {
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
import { create } from '@ackee/antonio';
import { takeLatestRequest } from '@ackee/antonio/es/saga-effects';

// create antonio instance
const { api } = create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
});

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

export default function*() {
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

### <a name="api-cancelableHandler"></a>`cancelableHandler({ handler: Function, handlerArg: Any, CANCEL: String })`

Low-level method used in previous custom effects.

#### Parameters

-   `Object`
    -   `handler: Function` - A function that receives `handlerArg` and `cancelToken` as first two parameters.
    -   `handlerArg: Any` - any value passed as 1st argument to the `handler` function (most likely object returned by a request action)
    -   `CANCEL: String` - An action type that cancel the running `handler` with the API request in progress.

#### Implementation

```js
import { CancelToken } from 'axios';
import { race, call, take } from 'redux-saga/effects';

export default function* cancellableHandler({ handlerArg, CANCEL, handler, onComplete }) {
    const source = CancelToken.source();

    const result = yield race({
        *handler() {
            yield call(handler, handlerArg, source.token);
            yield call(onComplete);
        },
        cancel: take(CANCEL),
    });

    if (result.cancel) {
        source.cancel();
    }
}
```
