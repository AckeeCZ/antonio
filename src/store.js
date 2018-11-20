const keys = {
    IS_AUTH: 'isAuth',
    AUTH_AXIOS: 'authAxios',
};

const store = {
    [keys.IS_AUTH]: false,
    [keys.AUTH_AXIOS]: null,
};

const set = (key, value) => {
    store[key] = value;
};

const get = key => {
    const value = store[key];

    return value === undefined ? null : value;
};

export { keys, set, get };
