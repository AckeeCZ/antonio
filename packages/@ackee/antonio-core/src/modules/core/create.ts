import { RequestConfig, GeneralConfig } from '../../types';

import HttpClient from './models/HttpClient';

export default function create(requestConfig?: RequestConfig, generalConfig?: Partial<GeneralConfig>) {
    return new HttpClient(requestConfig, generalConfig);
}
