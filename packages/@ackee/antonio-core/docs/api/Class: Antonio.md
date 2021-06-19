## Table of contents

### Constructors

-   [constructor](../wiki/Class:%20Antonio#constructor)

### Properties

-   [defaults](../wiki/Class:%20Antonio#defaults)
-   [interceptors](../wiki/Class:%20Antonio#interceptors)

### Methods

-   [delete](../wiki/Class:%20Antonio#delete)
-   [destroy](../wiki/Class:%20Antonio#destroy)
-   [get](../wiki/Class:%20Antonio#get)
-   [head](../wiki/Class:%20Antonio#head)
-   [options](../wiki/Class:%20Antonio#options)
-   [patch](../wiki/Class:%20Antonio#patch)
-   [post](../wiki/Class:%20Antonio#post)
-   [put](../wiki/Class:%20Antonio#put)

## Constructors

### constructor

• **new Antonio**(`requestConfig?`, `generalConfig?`)

**`example`**

```ts
import { Antonio } from `@ackee/antonio-core`;

const api = new Antonio({
    baseURL: 'https://some-domain.com/api/',
});
```

#### Parameters

| Name             | Type                                                       |
| :--------------- | :--------------------------------------------------------- |
| `requestConfig?` | [RequestConfig](../wiki/Exports#requestconfig)             |
| `generalConfig?` | `Partial`<[GeneralConfig](../wiki/Exports#generalconfig)\> |

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:13](https://github.com/AckeeCZ/antonio/blob/f5ba39d/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L13)

## Properties

### defaults

• `Readonly` **defaults**: `DefaultRequestConfig`

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:12](https://github.com/AckeeCZ/antonio/blob/f5ba39d/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L12)

---

### interceptors

• `Readonly` **interceptors**: `InterceptorManagers`

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:13](https://github.com/AckeeCZ/antonio/blob/f5ba39d/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L13)

## Methods

### delete

▸ **delete**(`url`, `requestConfig?`): `Generator`<unknown, [RequestResult](../wiki/Interface:%20RequestResult), IteratorResult<unknown, [RequestResult](../wiki/Interface:%20RequestResult)\>\> \| `Promise`<[RequestResult](../wiki/Interface:%20RequestResult)\>

#### Parameters

| Name             | Type                                           |
| :--------------- | :--------------------------------------------- |
| `url`            | `string`                                       |
| `requestConfig?` | [RequestConfig](../wiki/Exports#requestconfig) |

#### Returns

`Generator`<unknown, [RequestResult](../wiki/Interface:%20RequestResult), IteratorResult<unknown, [RequestResult](../wiki/Interface:%20RequestResult)\>\> \| `Promise`<[RequestResult](../wiki/Interface:%20RequestResult)\>

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:58](https://github.com/AckeeCZ/antonio/blob/f5ba39d/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L58)

---

### destroy

▸ **destroy**(): `void`

Clears-up memory after the current Antonio instance.

#### Returns

`void`

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:73](https://github.com/AckeeCZ/antonio/blob/f5ba39d/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L73)

---

### get

▸ **get**(`url`, `requestConfig?`): `Generator`<unknown, [RequestResult](../wiki/Interface:%20RequestResult), IteratorResult<unknown, [RequestResult](../wiki/Interface:%20RequestResult)\>\> \| `Promise`<[RequestResult](../wiki/Interface:%20RequestResult)\>

#### Parameters

| Name             | Type                                           |
| :--------------- | :--------------------------------------------- |
| `url`            | `string`                                       |
| `requestConfig?` | [RequestConfig](../wiki/Exports#requestconfig) |

#### Returns

`Generator`<unknown, [RequestResult](../wiki/Interface:%20RequestResult), IteratorResult<unknown, [RequestResult](../wiki/Interface:%20RequestResult)\>\> \| `Promise`<[RequestResult](../wiki/Interface:%20RequestResult)\>

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:54](https://github.com/AckeeCZ/antonio/blob/f5ba39d/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L54)

---

### head

▸ **head**(`url`, `requestConfig?`): `Generator`<unknown, [RequestResult](../wiki/Interface:%20RequestResult), IteratorResult<unknown, [RequestResult](../wiki/Interface:%20RequestResult)\>\> \| `Promise`<[RequestResult](../wiki/Interface:%20RequestResult)\>

#### Parameters

| Name             | Type                                           |
| :--------------- | :--------------------------------------------- |
| `url`            | `string`                                       |
| `requestConfig?` | [RequestConfig](../wiki/Exports#requestconfig) |

#### Returns

`Generator`<unknown, [RequestResult](../wiki/Interface:%20RequestResult), IteratorResult<unknown, [RequestResult](../wiki/Interface:%20RequestResult)\>\> \| `Promise`<[RequestResult](../wiki/Interface:%20RequestResult)\>

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:62](https://github.com/AckeeCZ/antonio/blob/f5ba39d/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L62)

---

### options

▸ **options**(`url`, `requestConfig?`): `Generator`<unknown, [RequestResult](../wiki/Interface:%20RequestResult), IteratorResult<unknown, [RequestResult](../wiki/Interface:%20RequestResult)\>\> \| `Promise`<[RequestResult](../wiki/Interface:%20RequestResult)\>

#### Parameters

| Name             | Type                                           |
| :--------------- | :--------------------------------------------- |
| `url`            | `string`                                       |
| `requestConfig?` | [RequestConfig](../wiki/Exports#requestconfig) |

#### Returns

`Generator`<unknown, [RequestResult](../wiki/Interface:%20RequestResult), IteratorResult<unknown, [RequestResult](../wiki/Interface:%20RequestResult)\>\> \| `Promise`<[RequestResult](../wiki/Interface:%20RequestResult)\>

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:66](https://github.com/AckeeCZ/antonio/blob/f5ba39d/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L66)

---

### patch

▸ **patch**(`url`, `body`, `requestConfig?`): `Generator`<unknown, [RequestResult](../wiki/Interface:%20RequestResult), IteratorResult<unknown, [RequestResult](../wiki/Interface:%20RequestResult)\>\> \| `Promise`<[RequestResult](../wiki/Interface:%20RequestResult)\>

#### Parameters

| Name             | Type                                               |
| :--------------- | :------------------------------------------------- |
| `url`            | `string`                                           |
| `body`           | [RequestBodyData](../wiki/Exports#requestbodydata) |
| `requestConfig?` | [RequestConfig](../wiki/Exports#requestconfig)     |

#### Returns

`Generator`<unknown, [RequestResult](../wiki/Interface:%20RequestResult), IteratorResult<unknown, [RequestResult](../wiki/Interface:%20RequestResult)\>\> \| `Promise`<[RequestResult](../wiki/Interface:%20RequestResult)\>

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:50](https://github.com/AckeeCZ/antonio/blob/f5ba39d/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L50)

---

### post

▸ **post**(`url`, `body`, `requestConfig?`): `Generator`<unknown, [RequestResult](../wiki/Interface:%20RequestResult), IteratorResult<unknown, [RequestResult](../wiki/Interface:%20RequestResult)\>\> \| `Promise`<[RequestResult](../wiki/Interface:%20RequestResult)\>

#### Parameters

| Name             | Type                                               |
| :--------------- | :------------------------------------------------- |
| `url`            | `string`                                           |
| `body`           | [RequestBodyData](../wiki/Exports#requestbodydata) |
| `requestConfig?` | [RequestConfig](../wiki/Exports#requestconfig)     |

#### Returns

`Generator`<unknown, [RequestResult](../wiki/Interface:%20RequestResult), IteratorResult<unknown, [RequestResult](../wiki/Interface:%20RequestResult)\>\> \| `Promise`<[RequestResult](../wiki/Interface:%20RequestResult)\>

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:42](https://github.com/AckeeCZ/antonio/blob/f5ba39d/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L42)

---

### put

▸ **put**(`url`, `body`, `requestConfig?`): `Generator`<unknown, [RequestResult](../wiki/Interface:%20RequestResult), IteratorResult<unknown, [RequestResult](../wiki/Interface:%20RequestResult)\>\> \| `Promise`<[RequestResult](../wiki/Interface:%20RequestResult)\>

#### Parameters

| Name             | Type                                               |
| :--------------- | :------------------------------------------------- |
| `url`            | `string`                                           |
| `body`           | [RequestBodyData](../wiki/Exports#requestbodydata) |
| `requestConfig?` | [RequestConfig](../wiki/Exports#requestconfig)     |

#### Returns

`Generator`<unknown, [RequestResult](../wiki/Interface:%20RequestResult), IteratorResult<unknown, [RequestResult](../wiki/Interface:%20RequestResult)\>\> \| `Promise`<[RequestResult](../wiki/Interface:%20RequestResult)\>

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:46](https://github.com/AckeeCZ/antonio/blob/f5ba39d/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L46)
