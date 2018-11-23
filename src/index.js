import { all, call } from 'redux-saga/effects';

import manageAuthHeader from './manageAuthHeader';
import * as Store from './store';

export { default as create } from './create';

export * as sagaEffects from './saga-effects';

export function* saga() {
    const sagas = [];

    if (Store.get(Store.keys.CONFIG).manageAuthHeader) {
        sagas.push(manageAuthHeader);
    }

    const tasks = sagas.map(fn => call(fn));

    yield all(tasks);
}
