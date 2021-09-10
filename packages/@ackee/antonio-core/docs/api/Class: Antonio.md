## Type parameters

| Name                  | Type                              |
| :-------------------- | :-------------------------------- |
| `TSuccessDataDefault` | `TSuccessDataDefault` = `unknown` |
| `TErrorDataDefault`   | `TErrorDataDefault` = `unknown`   |

## Table of contents

### Constructors

-   [constructor](../wiki/Class:%20Antonio#constructor)

### Properties

-   [defaults](../wiki/Class:%20Antonio#defaults)
-   [generalConfig](../wiki/Class:%20Antonio#generalconfig)
-   [interceptors](../wiki/Class:%20Antonio#interceptors)

### Methods

-   [delete](../wiki/Class:%20Antonio#delete)
-   [get](../wiki/Class:%20Antonio#get)
-   [head](../wiki/Class:%20Antonio#head)
-   [options](../wiki/Class:%20Antonio#options)
-   [patch](../wiki/Class:%20Antonio#patch)
-   [post](../wiki/Class:%20Antonio#post)
-   [put](../wiki/Class:%20Antonio#put)

## Constructors

### constructor

• **new Antonio**<TSuccessDataDefault, TErrorDataDefault\>(`requestConfig?`, `generalConfig?`)

**`example`**

```ts
import { Antonio } from `@ackee/antonio-core`;

const api = new Antonio({
    baseURL: 'https://some-domain.com/api/',
});
```

#### Type parameters

| Name                  | Type                              |
| :-------------------- | :-------------------------------- |
| `TSuccessDataDefault` | `TSuccessDataDefault` = `unknown` |
| `TErrorDataDefault`   | `TErrorDataDefault` = `unknown`   |

#### Parameters

| Name             | Type                                                       |
| :--------------- | :--------------------------------------------------------- |
| `requestConfig?` | [RequestConfig](../wiki/Interface:%20RequestConfig)        |
| `generalConfig?` | `Partial`<[GeneralConfig](../wiki/Exports#generalconfig)\> |

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:16](https://github.com/AckeeCZ/antonio/blob/1a6de80/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L16)

## Properties

### defaults

• `Readonly` **defaults**: `DefaultRequestConfig`

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:14](https://github.com/AckeeCZ/antonio/blob/1a6de80/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L14)

---

### generalConfig

• `Readonly` **generalConfig**: [GeneralConfig](../wiki/Exports#generalconfig)

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:16](https://github.com/AckeeCZ/antonio/blob/1a6de80/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L16)

---

### interceptors

• `Readonly` **interceptors**: `InterceptorManagers`

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:15](https://github.com/AckeeCZ/antonio/blob/1a6de80/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L15)

## Methods

### delete

▸ **delete**<TSuccessData, TErrorData\>(`url`, `requestConfig?`): `Generator`<unknown, [RequestResult](../wiki/Interface:%20RequestResult)<TSuccessData\>, IteratorResult<unknown, [RequestResult](../wiki/Interface:%20RequestResult)<TSuccessData\>\>\>

#### Type parameters

| Name           | Type                                   |
| :------------- | :------------------------------------- |
| `TSuccessData` | `TSuccessData` = `TSuccessDataDefault` |
| `TErrorData`   | `TErrorData` = `TErrorDataDefault`     |

#### Parameters

| Name             | Type                                                |
| :--------------- | :-------------------------------------------------- |
| `url`            | `string`                                            |
| `requestConfig?` | [RequestConfig](../wiki/Interface:%20RequestConfig) |

#### Returns

`Generator`<unknown, [RequestResult](../wiki/Interface:%20RequestResult)<TSuccessData\>, IteratorResult<unknown, [RequestResult](../wiki/Interface:%20RequestResult)<TSuccessData\>\>\>

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:73](https://github.com/AckeeCZ/antonio/blob/1a6de80/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L73)

---

### get

▸ **get**<TSuccessData, TErrorData\>(`url`, `requestConfig?`): `Generator`<unknown, [RequestResult](../wiki/Interface:%20RequestResult)<TSuccessData\>, IteratorResult<unknown, [RequestResult](../wiki/Interface:%20RequestResult)<TSuccessData\>\>\>

#### Type parameters

| Name           | Type                                   |
| :------------- | :------------------------------------- |
| `TSuccessData` | `TSuccessData` = `TSuccessDataDefault` |
| `TErrorData`   | `TErrorData` = `TErrorDataDefault`     |

#### Parameters

| Name             | Type                                                |
| :--------------- | :-------------------------------------------------- |
| `url`            | `string`                                            |
| `requestConfig?` | [RequestConfig](../wiki/Interface:%20RequestConfig) |

#### Returns

`Generator`<unknown, [RequestResult](../wiki/Interface:%20RequestResult)<TSuccessData\>, IteratorResult<unknown, [RequestResult](../wiki/Interface:%20RequestResult)<TSuccessData\>\>\>

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:66](https://github.com/AckeeCZ/antonio/blob/1a6de80/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L66)

---

### head

▸ **head**<TSuccessData, TErrorData\>(`url`, `requestConfig?`): `Generator`<unknown, [RequestResult](../wiki/Interface:%20RequestResult)<TSuccessData\>, IteratorResult<unknown, [RequestResult](../wiki/Interface:%20RequestResult)<TSuccessData\>\>\>

#### Type parameters

| Name           | Type                                   |
| :------------- | :------------------------------------- |
| `TSuccessData` | `TSuccessData` = `TSuccessDataDefault` |
| `TErrorData`   | `TErrorData` = `TErrorDataDefault`     |

#### Parameters

| Name             | Type                                                |
| :--------------- | :-------------------------------------------------- |
| `url`            | `string`                                            |
| `requestConfig?` | [RequestConfig](../wiki/Interface:%20RequestConfig) |

#### Returns

`Generator`<unknown, [RequestResult](../wiki/Interface:%20RequestResult)<TSuccessData\>, IteratorResult<unknown, [RequestResult](../wiki/Interface:%20RequestResult)<TSuccessData\>\>\>

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:80](https://github.com/AckeeCZ/antonio/blob/1a6de80/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L80)

---

### options

▸ **options**<TSuccessData, TErrorData\>(`url`, `requestConfig?`): `Generator`<unknown, [RequestResult](../wiki/Interface:%20RequestResult)<TSuccessData\>, IteratorResult<unknown, [RequestResult](../wiki/Interface:%20RequestResult)<TSuccessData\>\>\>

#### Type parameters

| Name           | Type                                   |
| :------------- | :------------------------------------- |
| `TSuccessData` | `TSuccessData` = `TSuccessDataDefault` |
| `TErrorData`   | `TErrorData` = `TErrorDataDefault`     |

#### Parameters

| Name             | Type                                                |
| :--------------- | :-------------------------------------------------- |
| `url`            | `string`                                            |
| `requestConfig?` | [RequestConfig](../wiki/Interface:%20RequestConfig) |

#### Returns

`Generator`<unknown, [RequestResult](../wiki/Interface:%20RequestResult)<TSuccessData\>, IteratorResult<unknown, [RequestResult](../wiki/Interface:%20RequestResult)<TSuccessData\>\>\>

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:87](https://github.com/AckeeCZ/antonio/blob/1a6de80/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L87)

---

### patch

▸ **patch**<TSuccessData, TErrorData\>(`url`, `body`, `requestConfig?`): `Generator`<unknown, [RequestResult](../wiki/Interface:%20RequestResult)<TSuccessData\>, IteratorResult<unknown, [RequestResult](../wiki/Interface:%20RequestResult)<TSuccessData\>\>\>

#### Type parameters

| Name           | Type                                   |
| :------------- | :------------------------------------- |
| `TSuccessData` | `TSuccessData` = `TSuccessDataDefault` |
| `TErrorData`   | `TErrorData` = `TErrorDataDefault`     |

#### Parameters

| Name             | Type                                                |
| :--------------- | :-------------------------------------------------- |
| `url`            | `string`                                            |
| `body`           | [RequestBodyData](../wiki/Exports#requestbodydata)  |
| `requestConfig?` | [RequestConfig](../wiki/Interface:%20RequestConfig) |

#### Returns

`Generator`<unknown, [RequestResult](../wiki/Interface:%20RequestResult)<TSuccessData\>, IteratorResult<unknown, [RequestResult](../wiki/Interface:%20RequestResult)<TSuccessData\>\>\>

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:58](https://github.com/AckeeCZ/antonio/blob/1a6de80/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L58)

---

### post

▸ **post**<TSuccessData, TErrorData\>(`url`, `body`, `requestConfig?`): `any`

#### Type parameters

| Name           | Type                                   |
| :------------- | :------------------------------------- |
| `TSuccessData` | `TSuccessData` = `TSuccessDataDefault` |
| `TErrorData`   | `TErrorData` = `TErrorDataDefault`     |

#### Parameters

| Name             | Type                                                |
| :--------------- | :-------------------------------------------------- |
| `url`            | `string`                                            |
| `body`           | [RequestBodyData](../wiki/Exports#requestbodydata)  |
| `requestConfig?` | [RequestConfig](../wiki/Interface:%20RequestConfig) |

#### Returns

`any`

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:42](https://github.com/AckeeCZ/antonio/blob/1a6de80/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L42)

---

### put

▸ **put**<TSuccessData, TErrorData\>(`url`, `body`, `requestConfig?`): `Generator`<unknown, [RequestResult](../wiki/Interface:%20RequestResult)<TSuccessData\>, IteratorResult<unknown, [RequestResult](../wiki/Interface:%20RequestResult)<TSuccessData\>\>\>

#### Type parameters

| Name           | Type                                   |
| :------------- | :------------------------------------- |
| `TSuccessData` | `TSuccessData` = `TSuccessDataDefault` |
| `TErrorData`   | `TErrorData` = `TErrorDataDefault`     |

#### Parameters

| Name             | Type                                                |
| :--------------- | :-------------------------------------------------- |
| `url`            | `string`                                            |
| `body`           | [RequestBodyData](../wiki/Exports#requestbodydata)  |
| `requestConfig?` | [RequestConfig](../wiki/Interface:%20RequestConfig) |

#### Returns

`Generator`<unknown, [RequestResult](../wiki/Interface:%20RequestResult)<TSuccessData\>, IteratorResult<unknown, [RequestResult](../wiki/Interface:%20RequestResult)<TSuccessData\>\>\>

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:50](https://github.com/AckeeCZ/antonio/blob/1a6de80/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L50)
