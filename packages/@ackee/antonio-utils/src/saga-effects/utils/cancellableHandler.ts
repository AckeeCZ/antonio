import AbortControllerPolyfill from 'abortcontroller-polyfill';
import { call, take, race } from 'redux-saga/effects';
import { CancellableHandler } from 'types';

const noop = function* () {};

export default function* cancellableHandler({ handlerArg, CANCEL, handler, onComplete = noop }: CancellableHandler) {
    const controller: AbortController = new AbortControllerPolyfill();

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
