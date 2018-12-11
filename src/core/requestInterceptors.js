import * as Errors from '../errors';
import { enhancedError } from '../utilities';

const isTokenTemplate = token => token.startsWith(':');

const uriParamsInterceptor = config => {
    const { uriParams, url: templateUrl, ...rest } = config;
    const templateToValue = token => {
        if (isTokenTemplate(token)) {
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

            delete uriParams[uriParamKey];

            // replace template (:itemId) with actual value
            return value;
        }

        return token;
    };

    const url = templateUrl
        .split('/')
        .map(templateToValue)
        .join('/');

    return {
        ...rest,
        uriParams,
        url,
    };
};

export default [uriParamsInterceptor];
