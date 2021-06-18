[@ackee/antonio-core](README.md) / Exports

# @ackee/antonio-core

## Table of contents

### Classes

-   [Antonio](classes/antonio.md)
-   [AntonioError](classes/antonioerror.md)

### Interfaces

-   [FullRequestConfig](interfaces/fullrequestconfig.md)
-   [RequestResult](interfaces/requestresult.md)

### Type aliases

-   [GeneralConfig](modules.md#generalconfig)
-   [RequestBodyData](modules.md#requestbodydata)
-   [RequestConfig](modules.md#requestconfig)
-   [RequestHeaders](modules.md#requestheaders)
-   [RequestSearchParams](modules.md#requestsearchparams)
-   [RequestUriParams](modules.md#requesturiparams)
-   [ResolverType](modules.md#resolvertype)
-   [ResponseData](modules.md#responsedata)
-   [ResponseDataType](modules.md#responsedatatype)

### Variables

-   [resolverTypes](modules.md#resolvertypes)

### Functions

-   [runIterableStream](modules.md#runiterablestream)

## Type aliases

### GeneralConfig

Ƭ **GeneralConfig**: `Object`

#### Type declaration

| Name           | Type                                    |
| :------------- | :-------------------------------------- |
| `logger`       | `RootLogger`                            |
| `resolverType` | [ResolverType](modules.md#resolvertype) |

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/general-config/index.ts:7](https://github.com/AckeeCZ/antonio/blob/ceeaf1e/packages/@ackee/antonio-core/src/modules/core/general-config/index.ts#L7)

---

### RequestBodyData

Ƭ **RequestBodyData**: `BodyInit` \| `Primitive` \| `PlainObject` \| `any`[]

#### Defined in

[packages/@ackee/antonio-core/src/types.ts:9](https://github.com/AckeeCZ/antonio/blob/ceeaf1e/packages/@ackee/antonio-core/src/types.ts#L9)

---

### RequestConfig

Ƭ **RequestConfig**: `Partial`<[FullRequestConfig](interfaces/fullrequestconfig.md)\> & { `cancelToken?`: `AbortSignal` }

#### Defined in

[packages/@ackee/antonio-core/src/types.ts:144](https://github.com/AckeeCZ/antonio/blob/ceeaf1e/packages/@ackee/antonio-core/src/types.ts#L144)

---

### RequestHeaders

Ƭ **RequestHeaders**: `Headers` \| `HeadersInit` \| `Params`

#### Defined in

[packages/@ackee/antonio-core/src/types.ts:91](https://github.com/AckeeCZ/antonio/blob/ceeaf1e/packages/@ackee/antonio-core/src/types.ts#L91)

---

### RequestSearchParams

Ƭ **RequestSearchParams**: `URLSearchParams` \| `Params`

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
    },
});
```

#### Defined in

[packages/@ackee/antonio-core/src/types.ts:126](https://github.com/AckeeCZ/antonio/blob/ceeaf1e/packages/@ackee/antonio-core/src/types.ts#L126)

---

### RequestUriParams

Ƭ **RequestUriParams**: `Params`

**`example`**

```ts
const { data } =
    yield *
    api.get('/user/:id', {
        uriParams: { id: '1' },
    });

console.assert(data.id === '1');
```

#### Defined in

[packages/@ackee/antonio-core/src/types.ts:103](https://github.com/AckeeCZ/antonio/blob/ceeaf1e/packages/@ackee/antonio-core/src/types.ts#L103)

---

### ResolverType

Ƭ **ResolverType**: typeof [resolverTypes](modules.md#resolvertypes)[`ResolverTypesKeys`]

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/constants/index.ts:7](https://github.com/AckeeCZ/antonio/blob/ceeaf1e/packages/@ackee/antonio-core/src/modules/core/constants/index.ts#L7)

---

### ResponseData

Ƭ **ResponseData**: `ArrayBuffer` \| `FormData` \| `ReadableStream`<Uint8Array\> \| `ArrayBufferView` \| `Blob` \| `Primitive` \| `PlainObject` \| `any`[] \| `IterableStream` \| `null`

#### Defined in

[packages/@ackee/antonio-core/src/types.ts:75](https://github.com/AckeeCZ/antonio/blob/ceeaf1e/packages/@ackee/antonio-core/src/types.ts#L75)

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

[packages/@ackee/antonio-core/src/types.ts:73](https://github.com/AckeeCZ/antonio/blob/ceeaf1e/packages/@ackee/antonio-core/src/types.ts#L73)

## Variables

### resolverTypes

• `Const` **resolverTypes**: `Object`

#### Type declaration

| Name        | Type          |
| :---------- | :------------ |
| `GENERATOR` | `"generator"` |
| `PROMISE`   | `"promise"`   |

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/constants/index.ts:1](https://github.com/AckeeCZ/antonio/blob/ceeaf1e/packages/@ackee/antonio-core/src/modules/core/constants/index.ts#L1)

## Functions

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

[packages/@ackee/antonio-core/src/modules/response/utils/runIterableStream.ts:24](https://github.com/AckeeCZ/antonio/blob/ceeaf1e/packages/@ackee/antonio-core/src/modules/response/utils/runIterableStream.ts#L24)
