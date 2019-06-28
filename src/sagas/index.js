import { call } from 'redux-saga/effects';

import * as Store from '../store';

import manageAuthHeader from './manageAuthHeader';

export default function* saga() {
    Store.set(Store.keys.SAGA_INITIALIZED, true);

    if (Store.get(Store.keys.CONFIG).manageAuthHeader) {
        yield call(manageAuthHeader);
    }
}
