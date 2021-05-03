import Headers from 'fetch-headers';
import loglevel from 'loglevel';

import { RequestConfig, GeneralConfig } from '../../../types';

export const defaultRequestConfig: Required<Pick<RequestConfig, 'responseType' | 'headers'>> = {
    responseType: 'json',
    headers: new Headers(),
};

export type DefaultRequestConfig = RequestConfig & typeof defaultRequestConfig;

export const defaultGeneralConfig: GeneralConfig = {
    logger: loglevel,
};
