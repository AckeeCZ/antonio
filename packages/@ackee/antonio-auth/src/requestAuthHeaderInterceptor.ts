import { getAccessToken } from '@ackee/petrus';
import { setAuthHeader } from '@ackee/antonio-utils';

export default function* requestAuthHeaderInterceptor(request: Request) {
    const accessToken = yield* getAccessToken();

    setAuthHeader(request.headers, accessToken?.token);

    return request;
}
