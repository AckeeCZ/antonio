import Headers from 'fetch-headers';
import { DefaultRequestConfig } from '../types';

export const defaultRequestConfig: DefaultRequestConfig = {
    responseType: 'json',
    headers: new Headers(),
};
