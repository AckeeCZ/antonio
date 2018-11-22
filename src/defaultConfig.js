const config = {
    manageAuthHeader: true,
    setAuthHeader(headers, accessToken) {
        if (accessToken) {
            headers.common.Authorization = `Bearer ${accessToken}`;
        } else {
            delete headers.common.Authorization;
        }
    },
};

export default config;
