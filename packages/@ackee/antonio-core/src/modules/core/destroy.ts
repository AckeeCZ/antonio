import Antonio from './models/Antonio';
import { generalConfigs } from './general-config';
import { interceptors } from './models/InterceptorManager';

export default function destroy(antonio: Antonio) {
    interceptors.delete(antonio);
    generalConfigs.delete(antonio);
}
