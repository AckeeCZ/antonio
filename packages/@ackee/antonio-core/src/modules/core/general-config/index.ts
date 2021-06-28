import loglevel from 'loglevel';
import type { RootLogger } from 'loglevel';

export type GeneralConfig = {
    logger: RootLogger;
};

export const defaultGeneralConfig: GeneralConfig = {
    logger: loglevel,
};
