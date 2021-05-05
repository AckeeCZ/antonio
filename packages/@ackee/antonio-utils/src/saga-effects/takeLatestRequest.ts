import { takeEvery, put, spawn } from 'redux-saga/effects';
import cancellableHandler from './utils/cancellableHandler';

import type { TakeLatestRequest, Fn, RequestId } from 'types';

export default function* takeLatestRequest(
    { REQUEST, cancelTask, requestIdSelector }: TakeLatestRequest,
    requestHandler: Fn,
) {
    const runningTasks = new Set<RequestId>();
    const DEFAULT_REQUEST_ID = Symbol('DEFAULT_REQUEST_ID');

    yield takeEvery(REQUEST, function* (action) {
        const requestId = requestIdSelector ? requestIdSelector(action) : DEFAULT_REQUEST_ID;

        if (runningTasks.has(requestId)) {
            yield put(cancelTask(requestId, action));
            runningTasks.delete(requestId);
        }

        yield spawn(cancellableHandler, {
            handler: requestHandler,
            handlerArg: action,
            CANCEL: cancelTask(requestId, action).type,
            onComplete() {
                runningTasks.delete(requestId);
            },
        });

        runningTasks.add(requestId);
    });
}
