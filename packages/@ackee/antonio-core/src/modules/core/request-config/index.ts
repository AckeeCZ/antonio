import Headers from 'fetch-headers';
import { RequestConfig } from 'types';

export const defaultRequestConfig: Required<Pick<RequestConfig, 'responseType' | 'headers'>> = {
    responseType: 'json',
    headers: new Headers(),
};

export type DefaultRequestConfig = RequestConfig & typeof defaultRequestConfig;
