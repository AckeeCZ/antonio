import type { AnyAction } from 'redux';
import { takeEvery, put, spawn } from 'redux-saga/effects';

import cancellableHandler from './utils/cancellableHandler';

import type { TakeLatestRequest, RequestHandler, RequestId } from '../types';

export default function* takeLatestRequest<
    RequestAction extends AnyAction = AnyAction,
    CancelAction extends AnyAction = AnyAction,
>(
    { REQUEST, cancelTask, requestIdSelector }: TakeLatestRequest<RequestAction, CancelAction>,
    requestHandler: RequestHandler<RequestAction>,
) {
    const runningTasks = new Set<RequestId>();
    const DEFAULT_REQUEST_ID = Symbol('DEFAULT_REQUEST_ID');

    yield takeEvery(REQUEST, function* (action: RequestAction) {
        const requestId = requestIdSelector ? requestIdSelector(action) : DEFAULT_REQUEST_ID;

        if (runningTasks.has(requestId)) {
            yield put(cancelTask(requestId, action));
            runningTasks.delete(requestId);
        }

        yield spawn(function* () {
            yield* cancellableHandler<RequestAction, CancelAction['type']>({
                handler: requestHandler,
                handlerArg: action,
                CANCEL: (action: AnyAction) => {
                    return action.type === cancelTask(requestId, action).type && requestIdSelector
                        ? requestIdSelector(action) === requestId
                        : true;
                },
                onComplete() {
                    runningTasks.delete(requestId);
                },
            });
        });

        runningTasks.add(requestId);
    });
}
