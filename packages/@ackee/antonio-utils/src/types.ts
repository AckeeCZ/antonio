import { AnyAction } from 'redux';
import type { ActionPattern } from 'redux-saga/effects';

export type Fn = (...args: any[]) => any;

export interface CancellableHandler {
    handlerArg: any;
    CANCEL: ActionPattern;
    handler: Fn;
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
