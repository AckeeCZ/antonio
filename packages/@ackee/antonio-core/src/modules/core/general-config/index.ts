import loglevel from 'loglevel';
import type { RootLogger } from 'loglevel';
import { resolverTypes } from '../constants';
import type { TAntonio } from '../models/Antonio';
import { ResolverType } from '../constants';

export type GeneralConfig = {
    logger: RootLogger;
    resolverType: ResolverType;
};

export const defaultGeneralConfig: GeneralConfig = {
    logger: loglevel,
    resolverType: resolverTypes.GENERATOR,
};

export const generalConfigs = new WeakMap<TAntonio, GeneralConfig>();