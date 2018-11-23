import { call, all } from 'redux-saga/effects';

import * as Store from '../store';

import manageAuthHeader from './manageAuthHeader';

export default function* saga() {
    Store.set(Store.keys.SAGA_INITIALIZE, true);

    const sagas = [];

    if (Store.get(Store.keys.CONFIG).manageAuthHeader) {
        sagas.push(manageAuthHeader);
    }

    const tasks = sagas.map(fn => call(fn));

    yield all(tasks);
}
