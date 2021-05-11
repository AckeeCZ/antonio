import { call, take, race } from 'redux-saga/effects';
import { CancellableHandler } from '../../types';

if (!('AbortController' in window)) {
    require('abortcontroller-polyfill/dist/abortcontroller-polyfill-only.js');
}

const noop = function* () {};

export default function* cancellableHandler({ handlerArg, CANCEL, handler, onComplete = noop }: CancellableHandler) {
    const controller = new AbortController();

    function* tasks() {
        yield call(handler, handlerArg, controller.signal);
        yield call(onComplete);
    }

    const result = yield race({
        tasks: call(tasks),
        cancel: take(CANCEL),
    });

    if (result.cancel) {
        controller.abort();
    }
}
