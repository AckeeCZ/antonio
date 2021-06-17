import { interceptors } from '../interceptors';

import type { TAntonio } from './models/Antonio';
import { generalConfigs } from './general-config';

export default function destroy(antonio: TAntonio) {
    interceptors.delete(antonio);
    generalConfigs.delete(antonio);
}
