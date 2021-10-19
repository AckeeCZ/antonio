import type { AnyAction } from 'redux';
import { call, take, race } from 'redux-saga/effects';
import type { ActionPattern } from 'redux-saga/effects';
import type { CancellableHandler } from '../../types';

if (!('AbortController' in window)) {
    require('abortcontroller-polyfill/dist/abortcontroller-polyfill-only.js');
}

const noop = function* () {};

export default function* cancellableHandler<RequestAction extends AnyAction, CancelActionType extends ActionPattern>({
    handlerArg,
    CANCEL,
    handler,
    onComplete = noop,
}: CancellableHandler<RequestAction, CancelActionType>) {
    const controller = new AbortController();

    function* tasks() {
        yield call(handler, handlerArg, controller.signal);
        yield call(onComplete);
    }

    /* @ts-ignore */
    const result = yield race({
        tasks: call(tasks),
        cancel: take(CANCEL),
    });

    if (result.cancel) {
        controller.abort();
    }
}
