import loglevel from 'loglevel';
import type { GeneralConfig } from '../../../types';
import { resolverTypes } from '../../../modules/core';
import type { TAntonio } from '../models/Antonio';

export const defaultGeneralConfig: GeneralConfig = {
    logger: loglevel,
    resolverType: resolverTypes.GENERATOR,
};

export const generalConfigs = new WeakMap<TAntonio, GeneralConfig>();
