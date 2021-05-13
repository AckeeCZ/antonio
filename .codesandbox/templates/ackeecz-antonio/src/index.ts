import { create } from '@ackee/antonio-core';

const api = create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
});

console.log(api);
