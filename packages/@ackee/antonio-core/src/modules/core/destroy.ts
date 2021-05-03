import HttpClient, { generalConfigs } from './models/HttpClient';

export default function destroy(httpClient: HttpClient) {
    return generalConfigs.delete(httpClient);
}
