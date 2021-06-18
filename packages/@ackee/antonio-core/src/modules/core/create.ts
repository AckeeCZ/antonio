import type { RequestConfig } from '../../types';
import type { GeneralConfig } from './general-config';

import Antonio from './models/Antonio';

/**
 * Creates a new instace of antonio.
 * @example
 * ```js
 * import { create } from `@ackee/antonio-core`;
 *
 * const api = create({
 *  baseURL: 'https://some-domain.com/api/',
 * });
 * ```
 */
export default function create(requestConfig?: RequestConfig, generalConfig?: Partial<GeneralConfig>) {
    return new Antonio(requestConfig, generalConfig);
}
