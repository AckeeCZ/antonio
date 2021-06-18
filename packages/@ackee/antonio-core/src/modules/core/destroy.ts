import { interceptors } from '../interceptors';

import type { TAntonio } from './models/Antonio';
import { generalConfigs } from './general-config';

/**
 * Clears-up memory after the current Antonio instance.
 */
export default function destroy(antonio: TAntonio) {
    interceptors.delete(antonio);
    generalConfigs.delete(antonio);
}
