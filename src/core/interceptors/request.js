import * as Store from '../../store';
import * as Errors from '../../errors';
import { enhancedError } from '../../utilities';

import setAccessTokenTimeout from '../setAccessTokenTimeout';

const isTokenTemplate = token => token.startsWith(':');

const uriParamsInterceptor = args => {
    const templateUrl = args[0];
    const config = args[args.length - 1];

    if (!config.uriParams) {
        return args;
    }

    const { uriParams, ...rest } = config;

    const templateToValue = token => {
        if (!isTokenTemplate(token)) {
            return token;
        }

        const uriParamKey = token.slice(1);
        const value = uriParams[uriParamKey];

        if (value === undefined) {
            throw enhancedError(
                Errors.requestInterceptors.undefinedUriParamProp({
                    uriParamKey,
                    config,
                }),
            );
        }

        // replace template (:itemId) with actual value
        return value;
    };

    const url = templateUrl
        .split('/')
        .map(templateToValue)
        .join('/');

    return [url].concat(args.slice(1, args.length - 1)).concat(rest);
};

function* authRequest(args) {
    if (Store.get(Store.keys.IS_AUTH)) {
        return args;
    }

    if (!Store.get(Store.keys.SAGA_INITIALIZED)) {
        throw enhancedError(Errors.authRequestProxy.unconnectedSaga);
    }

    yield setAccessTokenTimeout();

    return args;
}

export default function configurateInterceptors(config) {
    return [uriParamsInterceptor, config.auth && authRequest].filter(Boolean);
}
