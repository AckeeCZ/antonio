import type { RequestUriParams } from '../../../../types';

const isTokenTemplate = (token: string): boolean => token.startsWith(':');

export function setUriParams(templateUrl: string, uriParams: RequestUriParams): string {
    const templateToValue = (token: string) => {
        if (!isTokenTemplate(token)) {
            return token;
        }

        const uriParamKey = token.slice(1);
        const value = uriParams[uriParamKey];

        if (value === undefined) {
            throw new TypeError(
                `No URI param found for '${token}' template token among URI params: \n${JSON.stringify(
                    uriParams,
                    null,
                    2,
                )}\n for template URL: '${templateUrl}'.`,
            );
        }

        // replace template (:itemId) with actual value
        return value;
    };

    return templateUrl.split('/').map(templateToValue).join('/');
}
