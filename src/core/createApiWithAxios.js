import axios from 'axios';

export default function createApiWithAxios(options, proxy) {
    const axiosClient = axios.create(options);
    const api = {
        ...axiosClient,
    };

    const acceptedMethods = ['get', 'delete', 'head', 'options', 'post', 'put', 'patch'];

    for (const methodName of acceptedMethods) {
        api[methodName] = proxy(api[methodName]);
    }

    Object.freeze(api);

    return api;
}
