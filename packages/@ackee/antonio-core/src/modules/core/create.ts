import { RequestConfig } from './constants';

import HttpClient from './models/HttpClient';

export function create(customRequestConfig?: RequestConfig) {
    return new HttpClient(customRequestConfig);
}
