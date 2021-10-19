import { AnyAction } from 'redux';
import type { ActionPattern } from 'redux-saga/effects';

type Fn = (...args: any[]) => any;

export type RequestHandler<A extends AnyAction = AnyAction> = (requestAction: A, signal: AbortSignal) => any;

export interface CancellableHandler {
    handlerArg: any;
    CANCEL: ActionPattern;
    handler: RequestHandler;
    onComplete?: Fn;
}

export type RequestId = symbol | string | number;

export interface TakeLatestRequest {
    REQUEST: ActionPattern;
    cancelTask<A extends AnyAction = AnyAction>(requestId: RequestId, action: A): A;
    requestIdSelector?<A extends AnyAction = AnyAction>(action: A): RequestId;
}

export interface TakeRequest {
    REQUEST: ActionPattern;
    CANCEL: ActionPattern;
}
