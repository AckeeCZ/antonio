import { take } from 'redux-saga/effects';
import type { Fn, TakeRequest } from '../types';
import cancellableHandler from './utils/cancellableHandler';

/**
 * Blocking custom saga effect that can cancel the API request
 */
export default function* takeRequest(actionTypes: TakeRequest, handler: Fn) {
    while (true) {
        const action = yield take(actionTypes.REQUEST);

        yield cancellableHandler({
            handler,
            handlerArg: action,
            CANCEL: actionTypes.CANCEL,
        });
    }
}
