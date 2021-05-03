import { RequestConfig } from './types';

import HttpClient from './models/HttpClient';

export function create(requestConfig?: RequestConfig) {
    return new HttpClient(requestConfig);
}
