export const resolverTypes = {
    GENERATOR: 'generator',
    PROMISE: 'promise',
} as const;

type ResolverTypesKeys = keyof typeof resolverTypes;
export type ResolverType = typeof resolverTypes[ResolverTypesKeys];
