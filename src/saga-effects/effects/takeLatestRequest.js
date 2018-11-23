import { takeEvery, put, fork } from 'redux-saga/effects';
import cancellableTask from '../cancelableTask';

/**
 * @param {{ REQUEST: String, cancelTask: Function }} params
 * @param {Function} task
 */
export default function* takeLatestRequest({ REQUEST, cancelTask }, task) {
    let runningTask = null;

    yield takeEvery(REQUEST, function*(action) {
        if (runningTask) {
            yield put(cancelTask(action));
            runningTask = null;
        }

        runningTask = yield fork(cancellableTask, {
            task,
            taskArg: action,
            CANCEL: cancelTask(action).type,
        });
    });
}
