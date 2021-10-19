import type { AnyAction } from 'redux';
import type { ActionPattern } from 'redux-saga/effects';

export type RequestHandler<RequestAction> = (requestAction: RequestAction, signal: AbortSignal) => any;

export interface CancellableHandler<RequestAction extends AnyAction, CancelActionType = AnyAction['type']> {
    handlerArg: RequestAction;
    CANCEL: CancelActionType;
    handler: RequestHandler<RequestAction>;
    onComplete?(...args: any[]): void;
}

export type RequestId = symbol | string | number;

export interface TakeLatestRequest<RequestAction extends AnyAction, CancelAction extends AnyAction> {
    REQUEST: RequestAction['type'];
    cancelTask(requestId: RequestId, action: RequestAction): CancelAction;
    requestIdSelector?(action: RequestAction): RequestId;
}

export interface TakeRequest {
    REQUEST: ActionPattern;
    CANCEL: ActionPattern;
}
