[@ackee/antonio-core](../README.md) / [Exports](../modules.md) / Antonio

# Class: Antonio

## Table of contents

### Constructors

-   [constructor](antonio.md#constructor)

### Properties

-   [defaults](antonio.md#defaults)
-   [interceptors](antonio.md#interceptors)

### Methods

-   [delete](antonio.md#delete)
-   [destroy](antonio.md#destroy)
-   [get](antonio.md#get)
-   [head](antonio.md#head)
-   [options](antonio.md#options)
-   [patch](antonio.md#patch)
-   [post](antonio.md#post)
-   [put](antonio.md#put)

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

| Name             | Type                                                     |
| :--------------- | :------------------------------------------------------- |
| `requestConfig?` | [RequestConfig](../modules.md#requestconfig)             |
| `generalConfig?` | `Partial`<[GeneralConfig](../modules.md#generalconfig)\> |

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:13](https://github.com/AckeeCZ/antonio/blob/70b57b9/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L13)

## Properties

### defaults

• `Readonly` **defaults**: `DefaultRequestConfig`

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:12](https://github.com/AckeeCZ/antonio/blob/70b57b9/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L12)

---

### interceptors

• `Readonly` **interceptors**: `InterceptorManagers`

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:13](https://github.com/AckeeCZ/antonio/blob/70b57b9/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L13)

## Methods

### delete

▸ **delete**(`url`, `requestConfig?`): `Generator`<unknown, [RequestResult](../interfaces/requestresult.md), IteratorResult<unknown, [RequestResult](../interfaces/requestresult.md)\>\> \| `Promise`<[RequestResult](../interfaces/requestresult.md)\>

#### Parameters

| Name             | Type                                         |
| :--------------- | :------------------------------------------- |
| `url`            | `string`                                     |
| `requestConfig?` | [RequestConfig](../modules.md#requestconfig) |

#### Returns

`Generator`<unknown, [RequestResult](../interfaces/requestresult.md), IteratorResult<unknown, [RequestResult](../interfaces/requestresult.md)\>\> \| `Promise`<[RequestResult](../interfaces/requestresult.md)\>

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:58](https://github.com/AckeeCZ/antonio/blob/70b57b9/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L58)

---

### destroy

▸ **destroy**(): `void`

Clears-up memory after the current Antonio instance.

#### Returns

`void`

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:73](https://github.com/AckeeCZ/antonio/blob/70b57b9/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L73)

---

### get

▸ **get**(`url`, `requestConfig?`): `Generator`<unknown, [RequestResult](../interfaces/requestresult.md), IteratorResult<unknown, [RequestResult](../interfaces/requestresult.md)\>\> \| `Promise`<[RequestResult](../interfaces/requestresult.md)\>

#### Parameters

| Name             | Type                                         |
| :--------------- | :------------------------------------------- |
| `url`            | `string`                                     |
| `requestConfig?` | [RequestConfig](../modules.md#requestconfig) |

#### Returns

`Generator`<unknown, [RequestResult](../interfaces/requestresult.md), IteratorResult<unknown, [RequestResult](../interfaces/requestresult.md)\>\> \| `Promise`<[RequestResult](../interfaces/requestresult.md)\>

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:54](https://github.com/AckeeCZ/antonio/blob/70b57b9/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L54)

---

### head

▸ **head**(`url`, `requestConfig?`): `Generator`<unknown, [RequestResult](../interfaces/requestresult.md), IteratorResult<unknown, [RequestResult](../interfaces/requestresult.md)\>\> \| `Promise`<[RequestResult](../interfaces/requestresult.md)\>

#### Parameters

| Name             | Type                                         |
| :--------------- | :------------------------------------------- |
| `url`            | `string`                                     |
| `requestConfig?` | [RequestConfig](../modules.md#requestconfig) |

#### Returns

`Generator`<unknown, [RequestResult](../interfaces/requestresult.md), IteratorResult<unknown, [RequestResult](../interfaces/requestresult.md)\>\> \| `Promise`<[RequestResult](../interfaces/requestresult.md)\>

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:62](https://github.com/AckeeCZ/antonio/blob/70b57b9/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L62)

---

### options

▸ **options**(`url`, `requestConfig?`): `Generator`<unknown, [RequestResult](../interfaces/requestresult.md), IteratorResult<unknown, [RequestResult](../interfaces/requestresult.md)\>\> \| `Promise`<[RequestResult](../interfaces/requestresult.md)\>

#### Parameters

| Name             | Type                                         |
| :--------------- | :------------------------------------------- |
| `url`            | `string`                                     |
| `requestConfig?` | [RequestConfig](../modules.md#requestconfig) |

#### Returns

`Generator`<unknown, [RequestResult](../interfaces/requestresult.md), IteratorResult<unknown, [RequestResult](../interfaces/requestresult.md)\>\> \| `Promise`<[RequestResult](../interfaces/requestresult.md)\>

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:66](https://github.com/AckeeCZ/antonio/blob/70b57b9/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L66)

---

### patch

▸ **patch**(`url`, `body`, `requestConfig?`): `Generator`<unknown, [RequestResult](../interfaces/requestresult.md), IteratorResult<unknown, [RequestResult](../interfaces/requestresult.md)\>\> \| `Promise`<[RequestResult](../interfaces/requestresult.md)\>

#### Parameters

| Name             | Type                                             |
| :--------------- | :----------------------------------------------- |
| `url`            | `string`                                         |
| `body`           | [RequestBodyData](../modules.md#requestbodydata) |
| `requestConfig?` | [RequestConfig](../modules.md#requestconfig)     |

#### Returns

`Generator`<unknown, [RequestResult](../interfaces/requestresult.md), IteratorResult<unknown, [RequestResult](../interfaces/requestresult.md)\>\> \| `Promise`<[RequestResult](../interfaces/requestresult.md)\>

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:50](https://github.com/AckeeCZ/antonio/blob/70b57b9/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L50)

---

### post

▸ **post**(`url`, `body`, `requestConfig?`): `Generator`<unknown, [RequestResult](../interfaces/requestresult.md), IteratorResult<unknown, [RequestResult](../interfaces/requestresult.md)\>\> \| `Promise`<[RequestResult](../interfaces/requestresult.md)\>

#### Parameters

| Name             | Type                                             |
| :--------------- | :----------------------------------------------- |
| `url`            | `string`                                         |
| `body`           | [RequestBodyData](../modules.md#requestbodydata) |
| `requestConfig?` | [RequestConfig](../modules.md#requestconfig)     |

#### Returns

`Generator`<unknown, [RequestResult](../interfaces/requestresult.md), IteratorResult<unknown, [RequestResult](../interfaces/requestresult.md)\>\> \| `Promise`<[RequestResult](../interfaces/requestresult.md)\>

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:42](https://github.com/AckeeCZ/antonio/blob/70b57b9/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L42)

---

### put

▸ **put**(`url`, `body`, `requestConfig?`): `Generator`<unknown, [RequestResult](../interfaces/requestresult.md), IteratorResult<unknown, [RequestResult](../interfaces/requestresult.md)\>\> \| `Promise`<[RequestResult](../interfaces/requestresult.md)\>

#### Parameters

| Name             | Type                                             |
| :--------------- | :----------------------------------------------- |
| `url`            | `string`                                         |
| `body`           | [RequestBodyData](../modules.md#requestbodydata) |
| `requestConfig?` | [RequestConfig](../modules.md#requestconfig)     |

#### Returns

`Generator`<unknown, [RequestResult](../interfaces/requestresult.md), IteratorResult<unknown, [RequestResult](../interfaces/requestresult.md)\>\> \| `Promise`<[RequestResult](../interfaces/requestresult.md)\>

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:46](https://github.com/AckeeCZ/antonio/blob/70b57b9/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L46)
