# Request & Response Interceptors

The API design has been inspired by [interceptors in axios](https://axios-http.com/docs/interceptors).

-   Callback can be a function, async function, or generator function.
-   Request interceptor must return an instance of `Request`.
-   Response interceptor must return an instance of `Response`.

### Example

```ts
import { Antonio } from '@ackee/antonio-core';

const api = new Antonio();

// Add a request interceptor
api.interceptors.request.use(
    function* (request: Request, config: RequestConfig) {
        // Do something before request is sent
        // The return value must be always an instance of `Request`!
        return request;
    },
    (error: any, config: RequestConfig) => {
        // Do something with request error
    },
);

// Add a response interceptor
api.interceptors.response.use(
    function* (response: Response, config: RequestConfig) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        // The return value must be always an instance of `Response`!
        return response;
    },
    (error: any, config: RequestConfig) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
    },
);
```

Each interceptor returns an ID, which might be used for later ejection:

```ts
const interceptor = api.interceptors.request.use(function* (request: Request, config: RequestConfig) {
    // Do something before request is sent
    // The return value must be always an instance of `Request`
    return request;
});

api.interceptors.request.eject(interceptor);
```

---

[⬅️ Back to main README](../README.md)
