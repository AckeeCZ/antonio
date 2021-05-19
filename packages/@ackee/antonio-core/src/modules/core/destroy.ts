import type { TAntonio } from './models/Antonio';
import { generalConfigs } from './general-config';
import { interceptors } from './models/InterceptorManager';

export default function destroy(antonio: TAntonio) {
    interceptors.delete(antonio);
    generalConfigs.delete(antonio);
}
