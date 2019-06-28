import { takeLatest, takeLeading, put } from 'redux-saga/effects';
import {
    APPLY_ACCESS_TOKEN_REQUEST,
    UNAPPLY_ACCESS_TOKEN_REQUEST,
    applyAccessTokenResolve,
    unapplyAccessTokenResolve,
} from '@ackee/petrus';

import * as Store from '../store';

export default function* manageAuthHeader() {
    const { setAuthHeader } = Store.get(Store.keys.CONFIG);
    const authAxios = Store.get(Store.keys.AUTH_AXIOS);
    const { headers } = authAxios.defaults;

    yield takeLatest(APPLY_ACCESS_TOKEN_REQUEST, function*(action) {
        setAuthHeader(headers, action.payload);

        Store.set(Store.keys.IS_AUTH, true);

        yield put(applyAccessTokenResolve());
    });

    yield takeLeading(UNAPPLY_ACCESS_TOKEN_REQUEST, function*() {
        Store.set(Store.keys.IS_AUTH, false);

        setAuthHeader(headers, null);

        yield put(unapplyAccessTokenResolve());
    });
}
