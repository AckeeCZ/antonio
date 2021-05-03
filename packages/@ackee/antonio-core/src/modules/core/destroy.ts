import Antonio, { generalConfigs } from './models/Antonio';

export default function destroy(antonio: Antonio) {
    return generalConfigs.delete(antonio);
}
