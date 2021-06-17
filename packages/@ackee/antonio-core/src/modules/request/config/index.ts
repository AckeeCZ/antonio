import Headers from 'fetch-headers';

import { RequestConfig } from '../../../types';

export const defaultRequestConfig: Required<Pick<RequestConfig, 'headers'>> = {
    headers: new Headers(),
} as const;

export type DefaultRequestConfig = RequestConfig & typeof defaultRequestConfig;
