import type { AnyAction } from 'redux';
import { take } from 'redux-saga/effects';
import type { RequestHandler, TakeRequest } from '../types';
import cancellableHandler from './utils/cancellableHandler';

/**
 * Blocking custom saga effect that can cancel the API request
 */
export default function* takeRequest<RequestAction extends AnyAction = AnyAction>(
    actionTypes: TakeRequest,
    handler: RequestHandler<RequestAction>,
) {
    while (true) {
        /* @ts-ignore */
        const action = yield take(actionTypes.REQUEST);

        yield cancellableHandler<RequestAction, (typeof actionTypes)['CANCEL']>({
            handler,
            handlerArg: action,
            CANCEL: actionTypes.CANCEL,
        });
    }
}
