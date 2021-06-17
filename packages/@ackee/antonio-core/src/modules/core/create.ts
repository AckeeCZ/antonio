import type { RequestConfig } from '../../types';
import type { GeneralConfig } from './general-config';

import Antonio from './models/Antonio';

export default function create(requestConfig?: RequestConfig, generalConfig?: Partial<GeneralConfig>) {
    return new Antonio(requestConfig, generalConfig);
}
