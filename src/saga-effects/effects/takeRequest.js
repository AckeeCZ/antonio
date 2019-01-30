import { take } from 'redux-saga/effects';
import cancellableHandler from '../cancellableHandler';

/**
 * Blocking custom saga effect that can actually cancel the API request
 * @param {{ REQUEST: String, CANCEL: String }} params
 * @param {Function} task
 */
export default function* takeRequest(actionTypes = {}, task) {
    while (true) {
        const action = yield take(actionTypes.REQUEST);

        yield cancellableHandler({
            task,
            taskArg: action,
            CANCEL: actionTypes.CANCEL,
        });
    }
}
