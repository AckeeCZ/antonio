import { RequestConfig, GeneralConfig } from '../../types';

import Antonio from './models/Antonio';

export default function create(requestConfig?: RequestConfig, generalConfig?: Partial<GeneralConfig>) {
    return new Antonio(requestConfig, generalConfig);
}
