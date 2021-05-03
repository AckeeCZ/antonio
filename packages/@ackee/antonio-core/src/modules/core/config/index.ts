import Headers from 'fetch-headers';
import loglevel from 'loglevel';

import { DefaultRequestConfig, GeneralConfig } from '../../../types';

export const defaultRequestConfig: DefaultRequestConfig = {
    responseType: 'json',
    headers: new Headers(),
};

export const defaultGeneralConfig: GeneralConfig = {
    logger: loglevel,
};
