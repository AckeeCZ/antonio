import { CancelToken } from 'axios';
import { call, take, race } from 'redux-saga/effects';

/**
 *
 * @param {{taskArg: Any, CANCEL: String, task: Function}}
 */
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
