import { take } from 'redux-saga/effects';
import cancellableHandler from '../cancellableHandler';

/**
 * Blocking custom saga effect that can actually cancel the API request
 * @param {{ REQUEST: String, CANCEL: String }} params
 * @param {Function} handler
 */
export default function* takeRequest(actionTypes = {}, handler) {
    while (true) {
        const action = yield take(actionTypes.REQUEST);

        yield cancellableHandler({
            handler,
            handlerArg: action,
            CANCEL: actionTypes.CANCEL,
        });
    }
}
