import { CancelToken } from 'axios';
import { call, take, race } from 'redux-saga/effects';

/**
 *
 * @param {{handlerArg: Any, CANCEL: String, handler: Function, onComplete: Function?}}
 */
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
