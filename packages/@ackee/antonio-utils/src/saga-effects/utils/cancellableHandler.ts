import { call, take, race } from 'redux-saga/effects';
import { CancellableHandler } from 'types';

const noop = function* () {};

export default function* cancellableHandler({ handlerArg, CANCEL, handler, onComplete = noop }: CancellableHandler) {
    // FIXME: add polyfill
    // eslint-disable-next-line compat/compat
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
