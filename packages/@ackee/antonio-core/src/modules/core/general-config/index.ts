import loglevel from 'loglevel';
import { GeneralConfig } from 'types';

export const defaultGeneralConfig: GeneralConfig = {
    logger: loglevel,
};

export const generalConfigs = new WeakMap();
