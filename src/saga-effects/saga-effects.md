# Custom Saga Effects

## API

### `takeRequest(actionTypes: Object, task: Function)`

#### Parameters

-   `actionTypes: Object`
    -   `REQUEST: String` - action type that starts the task
    -   `CANCEL: String` - action type that aborts the running task
-   `task(requestAction, cancelToken): Function` - the actual API request is made here

#### Example

```js
import { create } from '@ackee/antonio';
import { takeRequest } from '@ackee/antonio/lib/saga-effects';

// create antoio instance
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

### `takeLatestRequest(params: Object, task: Function)`

#### Parameters

-   `params: Object`
    -   `REQUEST: String` - action type that starts the task
    -   `cancelTask: Function` - Redux action that will cancel the running task
-   `task(requestAction, cancelToken): Function` - the actual API request is made here

#### Example

```js
import { create } from '@ackee/antoio';
import { takeLatestRequest } from '@ackee/antoio/lib/saga-effects';

// create antoio instance
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

---

### `cancelableTask({ task: Function, taskArg: Any, CANCEL: String })`

Low-level method used in previous custom effects.

#### Parameters

-   `Object`
    -   `task: Function` - A function that receives `taskArg` and `cancelToken` as first two parameters.
    -   `taskArg: Any` - any value passed as 1st argument to the `task` function (most likely object returned by a request action)
    -   `CANCEL: String` - An action type that cancel the running `task` with the API request in progress.

#### Implementation

```js
import { CancelToken } from 'axios'; 
import { race, call, take } from 'redux-saga/effects';
import { takeLatestRequest } from '@ackee/antoio/lib/saga-effects';

export default function* cancellableTask({ taskArg, CANCEL, task }) {
    const source = CancelToken.source();

    const result = yield race({
        task: call(task, taskArg, source.token),
        cancel: take(CANCEL),
    });

    if (result.cancel) {
        source.cancel();
    }
}
```
