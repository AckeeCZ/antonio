import { takeEvery } from 'redux-saga/effects';
import { ACCESS_TOKEN_AVAILABLE, ACCESS_TOKEN_UNAVAILABLE } from '@ackee/petrus/es/actionType';

import * as Store from '../store';

export default function* manageAuthHeader() {
    const { setAuthHeader } = Store.get(Store.keys.CONFIG);
    const authAxios = Store.get(Store.keys.AUTH_AXIOS);
    const { headers } = authAxios.defaults;

    yield takeEvery(ACCESS_TOKEN_AVAILABLE, action => {
        setAuthHeader(headers, action.payload);
        Store.set(Store.keys.IS_AUTH, true);
    });

    yield takeEvery(ACCESS_TOKEN_UNAVAILABLE, () => {
        Store.set(Store.keys.IS_AUTH, false);
        setAuthHeader(headers, null);
    });
}
