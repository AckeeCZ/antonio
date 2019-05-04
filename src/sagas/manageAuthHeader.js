import { takeLatest, takeLeading } from 'redux-saga/effects';
import { ACCESS_TOKEN_AVAILABLE, ACCESS_TOKEN_UNAVAILABLE } from '@ackee/petrus';

import * as Store from '../store';

export default function* manageAuthHeader() {
    const { setAuthHeader } = Store.get(Store.keys.CONFIG);
    const authAxios = Store.get(Store.keys.AUTH_AXIOS);
    const { headers } = authAxios.defaults;

    yield takeLatest(ACCESS_TOKEN_AVAILABLE, action => {
        setAuthHeader(headers, action.payload);
        Store.set(Store.keys.IS_AUTH, true);
    });

    yield takeLeading(ACCESS_TOKEN_UNAVAILABLE, () => {
        Store.set(Store.keys.IS_AUTH, false);
        setAuthHeader(headers, null);
    });
}
