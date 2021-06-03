import loglevel from 'loglevel';
import type { GeneralConfig } from '../../../types';
import { resolverTypes } from '../constants';
import type { TAntonio } from '../models/Antonio';

export const defaultGeneralConfig: GeneralConfig = {
    logger: loglevel,
    resolverType: resolverTypes.GENERATOR,
} as const;

export const generalConfigs = new WeakMap<TAntonio, GeneralConfig>();
