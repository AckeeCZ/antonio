/**
 * @typedef CommonHeaders
 * @type {Object}
 * @property {Object} common
 * @property {string | null} common.Authorization
 */

/**
 * @param {CommonHeaders} headers
 * @param {{ token: string } | null} accessToken
 */
export function setAuthHeader(headers, accessToken) {
    if (accessToken) {
        headers.common.Authorization = `Bearer ${accessToken.token}`;
    } else {
        delete headers.common.Authorization;
    }
}

const config = {
    manageAuthHeader: true,

    setAuthHeader,

    accessTokenUnavailableTimeout: {
        enabled: false,
        duration: 1000 * 30,
        silent: true,
    },
};

export default config;
