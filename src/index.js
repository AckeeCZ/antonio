import { all } from 'redux-saga/effects';
import manageAuthHeader from './manageAuthHeader';

export { default as create } from './create';

export function* saga() {
    yield all([manageAuthHeader()]);
}
