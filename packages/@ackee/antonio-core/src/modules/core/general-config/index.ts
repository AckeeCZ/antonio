import loglevel from 'loglevel';
import type { GeneralConfig } from '../../../types';
import { ResolverType } from '../../../types';
import type { TAntonio } from '../models/Antonio';

export const defaultGeneralConfig: GeneralConfig = {
    logger: loglevel,
    resolverType: ResolverType.GENERATOR,
};

export const generalConfigs = new WeakMap<TAntonio, GeneralConfig>();
