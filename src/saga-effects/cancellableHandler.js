import { CancelToken } from 'axios';
import { call, take, race } from 'redux-saga/effects';

const noop = () => {};

/**
 *
 * @param {{handlerArg: Any, CANCEL: String, handler: Function, onComplete: Function?}}
 */
export default function* cancellableHandler({ handlerArg, CANCEL, handler, onComplete = noop }) {
    const source = CancelToken.source();

    function* tasks() {
        yield call(handler, handlerArg, source.token);
        yield call(onComplete);
    }

    const result = yield race({
        tasks: call(tasks),
        cancel: take(CANCEL),
    });

    if (result.cancel) {
        source.cancel();
    }
}
