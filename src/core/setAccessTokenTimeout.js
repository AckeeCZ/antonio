import { delay } from 'redux-saga';
import { take, call, race } from 'redux-saga/effects';
import { actionTypes } from '@ackee/petrus/worker';

import * as Store from '../store';
import * as Errors from '../errors';
import { enhancedError } from '../utilities';

/**
 * setAccessTokenTimeout is called when access token isn't available (IS_AUTH is false).
 * If 'timeDuration' isn't falsy, set timeout for that duration.
 * The timeout is cancelled if access token will become available sooner than the timeout ends,
 * otherwise the 'errors.authRequestProxy.timeout' error is thrown.
 */
function* setAccessTokenTimeout() {
    const { accessTokenUnavailableTimeout } = Store.get(Store.keys.CONFIG);
    const { enabled, duration, silent } = accessTokenUnavailableTimeout;

    if (!enabled) {
        return;
    }

    const result = yield race({
        timeout: call(delay, duration),
        accessTokenAvailable: take(actionTypes.ACCESS_TOKEN_AVAILABLE),
    });

    if (result.timeout && !silent) {
        throw enhancedError(Errors.authRequestProxy.timeout);
    }
}

export default setAccessTokenTimeout;
