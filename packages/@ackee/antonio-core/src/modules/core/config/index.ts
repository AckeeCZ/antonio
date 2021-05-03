import Headers from 'fetch-headers';
import { DefaultRequestConfig } from '../constants';

export const defaultRequestConfig: DefaultRequestConfig = {
    responseType: 'json',
    headers: new Headers(),
};
