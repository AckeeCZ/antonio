import { Antonio, generatorToPromise } from '@ackee/antonio-core';

const api = new Antonio({
    baseURL: 'https://jsonplaceholder.typicode.com/',
});

function* fetchTodos() {
    const res = yield* api.get('/todos');

    console.log(res.data);
}

generatorToPromise(fetchTodos());
