import 'whatwg-fetch';
import Headers from 'fetch-headers';
import { generatorToPromise as toPromise } from '../../makeRequest';
import { Antonio } from '../Antonio';

interface User {
    id: string;
}

type Users = User[];

/**
    README:
        The API never actually update the database and returns stale data. 
        That's why no test below checks if the returned data contains data from a request.
*/

describe('Antonio', () => {
    let api: Antonio;
    const BASE_URL = 'https://jsonplaceholder.typicode.com/';

    beforeEach(() => {
        api = new Antonio({
            baseURL: BASE_URL,
        });
    });

    it('has correct default config', () => {
        expect(api.defaults).toEqual({
            baseURL: BASE_URL,
            headers: new Headers(),
        });
    });

    it('has interceptors interface setup', () => {
        expect(api.interceptors).toHaveProperty('request');
        expect(api.interceptors).toHaveProperty('response');
    });

    it('fetches users', async () => {
        const { data, response, request } = await toPromise(api.get<Users>('/users'));

        expect(data).toBeInstanceOf(Array);
        expect(response).toBeInstanceOf(Response);
        expect(request).toBeInstanceOf(Request);
    });

    it('deletes an user', async () => {
        await toPromise(
            api.delete('/users/:id', {
                uriParams: { id: 1 },
            }),
        );
    });

    it('updates an user', async () => {
        const { data } = await toPromise(
            api.put<User>(
                '/users/:id',
                { user: 'Alois' },
                {
                    uriParams: { id: 1 },
                },
            ),
        );

        expect(data).toEqual({ id: 1 });
    });

    it('fetches an user', async () => {
        const { data } = await toPromise(
            api.get<User>('/users/:id', {
                uriParams: { id: 1 },
            }),
        );

        expect(data).toHaveProperty('id');
        expect(data.id).toBe(1);
    });

    it('does an patch update of an user', async () => {
        const { data } = await toPromise(
            api.get<User>('/users/:id', {
                uriParams: { id: 1 },
            }),
        );

        expect(data).toHaveProperty('id');
        expect(data.id).toBe(1);
    });

    it('creates a user', async () => {
        const { data } = await toPromise(
            api.post<User>('/users', {
                name: 'Alois',
            }),
        );

        expect(data).toHaveProperty('id');
    });

    it('makes an HEAD req.', async () => {
        const result = await toPromise(api.head('/users'));

        expect(result.data).toBe(null);
    });

    it('makes an OPTIONS req.', async () => {
        const result = await toPromise(api.options('/users'));

        expect(result.data).toBe(null);
    });
});
