const config = {
    manageAuthHeader: true,

    setAuthHeader(headers, accessToken) {
        if (accessToken) {
            headers.common.Authorization = `Bearer ${accessToken.token}`;
        } else {
            delete headers.common.Authorization;
        }
    },

    accessTokenUnavailableTimeout: {
        enabled: false,
        duration: 1000 * 30,
        silent: true,
    },
};

export default config;
