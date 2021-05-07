import { AnyAction } from 'redux';
import type { ActionPattern } from 'redux-saga/effects';

type Fn = (...args: any[]) => any;

export type RequestHandler = (requestAction: AnyAction, signal: AbortSignal) => any;

export interface CancellableHandler {
    handlerArg: any;
    CANCEL: ActionPattern;
    handler: RequestHandler;
    onComplete?: Fn;
}

export type RequestId = symbol | string | number;

export interface TakeLatestRequest {
    REQUEST: ActionPattern;
    cancelTask: (requestId: RequestId, action: AnyAction) => AnyAction;
    requestIdSelector?: (action: AnyAction) => RequestId;
}

export interface TakeRequest {
    REQUEST: ActionPattern;
    CANCEL: ActionPattern;
}
