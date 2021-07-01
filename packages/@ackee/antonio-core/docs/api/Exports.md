## Table of contents

### Classes

-   [Antonio](../wiki/Class:%20Antonio)
-   [AntonioError](../wiki/Class:%20AntonioError)

### Interfaces

-   [RequestConfig](../wiki/Interface:%20RequestConfig)
-   [RequestParams](../wiki/Interface:%20RequestParams)
-   [RequestResult](../wiki/Interface:%20RequestResult)

### Type aliases

-   [GeneralConfig](../wiki/Exports#generalconfig)
-   [RequestBodyData](../wiki/Exports#requestbodydata)
-   [RequestHeaders](../wiki/Exports#requestheaders)
-   [RequestSearchParams](../wiki/Exports#requestsearchparams)
-   [RequestUriParams](../wiki/Exports#requesturiparams)
-   [ResolverType](../wiki/Exports#resolvertype)
-   [ResponseData](../wiki/Exports#responsedata)
-   [ResponseDataType](../wiki/Exports#responsedatatype)

### Variables

-   [resolverTypes](../wiki/Exports#resolvertypes)

### Functions

-   [generatorToPromise](../wiki/Exports#generatortopromise)
-   [isAntonioError](../wiki/Exports#isantonioerror)
-   [runIterableStream](../wiki/Exports#runiterablestream)

## Type aliases

### GeneralConfig

Ƭ **GeneralConfig**: `Object`

#### Type declaration

| Name     | Type         |
| :------- | :----------- |
| `logger` | `RootLogger` |

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/general-config/index.ts:4](https://github.com/AckeeCZ/antonio/blob/17ef1cc/packages/@ackee/antonio-core/src/modules/core/general-config/index.ts#L4)

---

### RequestBodyData

Ƭ **RequestBodyData**: `BodyInit` \| `Primitive` \| `object` \| `any`[]

#### Defined in

[packages/@ackee/antonio-core/src/types.ts:7](https://github.com/AckeeCZ/antonio/blob/17ef1cc/packages/@ackee/antonio-core/src/types.ts#L7)

---

### RequestHeaders

Ƭ **RequestHeaders**: `Headers` \| `HeadersInit` \| { [key: string]: `string`; }

#### Defined in

[packages/@ackee/antonio-core/src/types.ts:85](https://github.com/AckeeCZ/antonio/blob/17ef1cc/packages/@ackee/antonio-core/src/types.ts#L85)

---

### RequestSearchParams

Ƭ **RequestSearchParams**: `URLSearchParams` \| { [key: string]: `string` \| `number` \| `boolean` \| (`string` \| `number` \| `boolean`)[]; }

An instace of `URLSearchParams` or a plain object.

**`example`**

```ts
api.get('/posts', {
    params: new URLSearchParams({
        page: 1,
        limit: 20,
    }),
});
```

**`example`**

```ts
api.get('/posts', {
    params: {
        page: 1,
        limit: 20,
        userIds: [1, 2, 3],
    },
});
```

#### Defined in

[packages/@ackee/antonio-core/src/types.ts:128](https://github.com/AckeeCZ/antonio/blob/17ef1cc/packages/@ackee/antonio-core/src/types.ts#L128)

---

### RequestUriParams

Ƭ **RequestUriParams**: `Object`

**`example`**

```ts
const { data } =
    yield *
    api.get('/user/:id', {
        uriParams: { id: '1' },
    });

console.assert(data.id === '1');
```

#### Index signature

▪ [key: `string`]: `string` \| `number`

#### Defined in

[packages/@ackee/antonio-core/src/types.ts:102](https://github.com/AckeeCZ/antonio/blob/17ef1cc/packages/@ackee/antonio-core/src/types.ts#L102)

---

### ResolverType

Ƭ **ResolverType**: typeof [resolverTypes](../wiki/Exports#resolvertypes)[`ResolverTypesKeys`]

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/constants/index.ts:7](https://github.com/AckeeCZ/antonio/blob/17ef1cc/packages/@ackee/antonio-core/src/modules/core/constants/index.ts#L7)

---

### ResponseData

Ƭ **ResponseData**: `ArrayBuffer` \| `FormData` \| `ReadableStream`<Uint8Array\> \| `ArrayBufferView` \| `Blob` \| `Primitive` \| `object` \| `any`[] \| `IterableStream` \| `null`

#### Defined in

[packages/@ackee/antonio-core/src/types.ts:73](https://github.com/AckeeCZ/antonio/blob/17ef1cc/packages/@ackee/antonio-core/src/types.ts#L73)

---

### ResponseDataType

Ƭ **ResponseDataType**: `"json"` \| `"blob"` \| `"formData"` \| `"text"` \| `"arrayBuffer"` \| `"iterableStream"` \| `"stream"`

It defines the format of the returned `data` property in the request result object (`RequestResult`):

-   `json` -> `data === await response.json()`
-   `text` -> `data === await response.text()`
-   ...

#### Default behavior based on `Content-Type` header

Antonio selects the `responseDataType` by default based on the response `Content-Type` header (its mime type).
Based on that it chooses method for formatting the body:

-   `Content-Type: application/json` refers to `response.json()` method.
-   `text/*` -> `response.text()` method.
-   `image/*`, `audio/*`, `video/*`, `application/octet-stream` -> `response.arrayBuffer()`.
-   `multipart/form-data` -> `response.formData()`

Without `Content-Type` or without explicitly defined `responseDataType`, it returns `data` as `null`.

#### Exception with `Content-Length` header

Note that if the `Content-Length` header is `'0'`, then formatting body is skip completely and `data` are `null`.

#### Streaming the response

Selecting `iterableStream` response data type fetches data with `ReadableStream`.
The `data` is going to be async generator that yields out slices of data.
If the `Content-Type` response header has `application/json` mime type,
then the received chunk of string from the stream is going to be parsed as json
and the `slice` and once a valid json is created, it's yielded out as the `slice`.

**Note that both examples are functionally identical.**

_#1 Using async generators:_

**`example`**

```ts
async function* fetchPosts() {
    const { data } = yield* api.get('/posts', {
        responseDataType: 'iterableStream',
    });

    for await (const slice of data) {
        console.log(slice); // -> [{ title: '1' }, { title: '2' }, ...]
    }
}
```

_#2 Using sync generators:_

**`example`**

```ts
import { runIterableStream } from `@ackee/antonio-core`;

function* fetchPosts() {
    const { data } = yield* api.get('/posts', {
        responseDataType: 'iterableStream',
    });

    yield runIterableStream(data, function* (slice) {
        console.log(slice); // -> [{ title: '1' }, { title: '2' }, ...]
    });
}
```

#### Defined in

[packages/@ackee/antonio-core/src/types.ts:71](https://github.com/AckeeCZ/antonio/blob/17ef1cc/packages/@ackee/antonio-core/src/types.ts#L71)

## Variables

### resolverTypes

• `Const` **resolverTypes**: `Object`

#### Type declaration

| Name        | Type          |
| :---------- | :------------ |
| `GENERATOR` | `"generator"` |
| `PROMISE`   | `"promise"`   |

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/constants/index.ts:1](https://github.com/AckeeCZ/antonio/blob/17ef1cc/packages/@ackee/antonio-core/src/modules/core/constants/index.ts#L1)

## Functions

### generatorToPromise

▸ **generatorToPromise**<T\>(`it`): `Promise`<T\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name | Type                                              |
| :--- | :------------------------------------------------ |
| `it` | `AsyncGenerator`<any, T\> \| `Generator`<any, T\> |

#### Returns

`Promise`<T\>

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/makeRequest.ts:8](https://github.com/AckeeCZ/antonio/blob/17ef1cc/packages/@ackee/antonio-core/src/modules/core/makeRequest.ts#L8)

---

### isAntonioError

▸ `Const` **isAntonioError**(`error`): error is AntonioError<unknown\>

#### Parameters

| Name    | Type  |
| :------ | :---- |
| `error` | `any` |

#### Returns

error is AntonioError<unknown\>

#### Defined in

[packages/@ackee/antonio-core/src/modules/response/errors/index.ts:21](https://github.com/AckeeCZ/antonio/blob/17ef1cc/packages/@ackee/antonio-core/src/modules/response/errors/index.ts#L21)

---

### runIterableStream

▸ **runIterableStream**<T\>(`it`, `onProgress`): `Generator`<T \| Promise<IteratorResult<T, void\>\>, void, any\>

Converts async generator to sync generator.
Use it to handle `iterableStream` response data type.

**`example`**

```ts
import { runIterableStream } from `@ackee/antonio-core`;

function* fetchPosts() {
    const { data } = yield* api.get('/posts', {
        responseDataType: 'iterableStream',
    });

    yield runIterableStream(data, function* (slice) {
        console.log(slice); // -> [{ title: '1' }, { title: '2' }, ...]
    });
}
```

#### Type parameters

| Name | Type                      |
| :--- | :------------------------ |
| `T`  | `T` = `string` \| `any`[] |

#### Parameters

| Name         | Type                                |
| :----------- | :---------------------------------- |
| `it`         | `AsyncGenerator`<T, void, unknown\> |
| `onProgress` | `OnProgress`<T\>                    |

#### Returns

`Generator`<T \| Promise<IteratorResult<T, void\>\>, void, any\>

#### Defined in

[packages/@ackee/antonio-core/src/modules/response/utils/runIterableStream.ts:24](https://github.com/AckeeCZ/antonio/blob/17ef1cc/packages/@ackee/antonio-core/src/modules/response/utils/runIterableStream.ts#L24)