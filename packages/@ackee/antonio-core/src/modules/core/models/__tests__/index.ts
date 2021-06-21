import 'whatwg-fetch';
import { generatorToPromise as toPromise } from '../../makeRequest';
import { Antonio } from '../Antonio';

describe('Antonio class', () => {
    let api: Antonio;

    beforeEach(() => {
        api = new Antonio({
            baseURL: 'https://jsonplaceholder.typicode.com/',
        });
    });

    afterEach(() => {
        api.destroy();
    });

    it('fetch users', async () => {
        const { data, response, request } = await toPromise(api.get('/users'));

        expect(data).toBeInstanceOf(Array);
        expect(response).toBeInstanceOf(Response);
        expect(request).toBeInstanceOf(Request);
    });

    // TODO:
    it.skip('create a user', async () => {
        interface User {
            name: string;
        }
        const user: User = {
            name: 'Alois',
        };
        const { data } = await toPromise(api.post('/users', user));

        expect(data).toContain(user);
    });
});
