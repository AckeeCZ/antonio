export const parseContentTypeHeader = (header: string) => header.split(';')[0];

export const parseMimeTypes = (mimeTypes: string) => mimeTypes.split(',').map(type => type.trim());
