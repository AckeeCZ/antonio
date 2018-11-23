import { take } from 'redux-saga/effects';
import cancellableTask from '../cancelableTask';

/**
 * Blocking custom saga effect that can actually cancel the API request
 * @param {{ REQUEST: String, CANCEL: String }} actionTypes
 * @param {Function} task
 */
export default function* takeRequest(actionTypes = {}, task) {
    while (true) {
        const action = yield take(actionTypes.REQUEST);

        yield cancellableTask({
            task,
            taskArg: action,
            CANCEL: actionTypes.CANCEL,
        });
    }
}
