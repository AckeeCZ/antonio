import type { ResponseTypes, ResolverTypes } from '../../../types';

export const responseTypes: ResponseTypes = {
    json: 'application/json',
    text: 'text/*',
    formData: 'multipart/form-data',
    blob: '*/*',
    arrayBuffer: '*/*',
    stream: '*/*',
    iterableStream: '*/*',
};

export const resolverTypes: ResolverTypes = {
    GENERATOR: 'generator',
    PROMISE: 'promise',
};
