[@ackee/antonio-core - v4.0.0-beta.38](../README.md) / [Exports](../modules.md) / Antonio

# Class: Antonio<TSuccessDataDefault, TErrorDataDefault\>

## Type parameters

| Name                  | Type                              |
| :-------------------- | :-------------------------------- |
| `TSuccessDataDefault` | `TSuccessDataDefault` = `unknown` |
| `TErrorDataDefault`   | `TErrorDataDefault` = `unknown`   |

## Table of contents

### Constructors

-   [constructor](antonio.md#constructor)

### Properties

-   [defaults](antonio.md#defaults)
-   [generalConfig](antonio.md#generalconfig)
-   [interceptors](antonio.md#interceptors)

### Methods

-   [delete](antonio.md#delete)
-   [get](antonio.md#get)
-   [head](antonio.md#head)
-   [options](antonio.md#options)
-   [patch](antonio.md#patch)
-   [post](antonio.md#post)
-   [put](antonio.md#put)

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

| Name             | Type                                                     |
| :--------------- | :------------------------------------------------------- |
| `requestConfig?` | [RequestConfig](../interfaces/requestconfig.md)          |
| `generalConfig?` | `Partial`<[GeneralConfig](../modules.md#generalconfig)\> |

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:16](https://github.com/AckeeCZ/antonio/blob/8bc697c/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L16)

## Properties

### defaults

• `Readonly` **defaults**: `DefaultRequestConfig`

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:14](https://github.com/AckeeCZ/antonio/blob/8bc697c/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L14)

---

### generalConfig

• `Readonly` **generalConfig**: [GeneralConfig](../modules.md#generalconfig)

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:16](https://github.com/AckeeCZ/antonio/blob/8bc697c/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L16)

---

### interceptors

• `Readonly` **interceptors**: `InterceptorManagers`

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:15](https://github.com/AckeeCZ/antonio/blob/8bc697c/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L15)

## Methods

### delete

▸ **delete**<TSuccessData, TErrorData\>(`url`, `requestConfig?`): `Generator`<unknown, [RequestResult](../interfaces/requestresult.md)<TSuccessData\>, IteratorResult<unknown, [RequestResult](../interfaces/requestresult.md)<TSuccessData\>\>\>

#### Type parameters

| Name           | Type                                   |
| :------------- | :------------------------------------- |
| `TSuccessData` | `TSuccessData` = `TSuccessDataDefault` |
| `TErrorData`   | `TErrorData` = `TErrorDataDefault`     |

#### Parameters

| Name             | Type                                            |
| :--------------- | :---------------------------------------------- |
| `url`            | `string`                                        |
| `requestConfig?` | [RequestConfig](../interfaces/requestconfig.md) |

#### Returns

`Generator`<unknown, [RequestResult](../interfaces/requestresult.md)<TSuccessData\>, IteratorResult<unknown, [RequestResult](../interfaces/requestresult.md)<TSuccessData\>\>\>

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:73](https://github.com/AckeeCZ/antonio/blob/8bc697c/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L73)

---

### get

▸ **get**<TSuccessData, TErrorData\>(`url`, `requestConfig?`): `Generator`<unknown, [RequestResult](../interfaces/requestresult.md)<TSuccessData\>, IteratorResult<unknown, [RequestResult](../interfaces/requestresult.md)<TSuccessData\>\>\>

#### Type parameters

| Name           | Type                                   |
| :------------- | :------------------------------------- |
| `TSuccessData` | `TSuccessData` = `TSuccessDataDefault` |
| `TErrorData`   | `TErrorData` = `TErrorDataDefault`     |

#### Parameters

| Name             | Type                                            |
| :--------------- | :---------------------------------------------- |
| `url`            | `string`                                        |
| `requestConfig?` | [RequestConfig](../interfaces/requestconfig.md) |

#### Returns

`Generator`<unknown, [RequestResult](../interfaces/requestresult.md)<TSuccessData\>, IteratorResult<unknown, [RequestResult](../interfaces/requestresult.md)<TSuccessData\>\>\>

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:66](https://github.com/AckeeCZ/antonio/blob/8bc697c/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L66)

---

### head

▸ **head**<TSuccessData, TErrorData\>(`url`, `requestConfig?`): `Generator`<unknown, [RequestResult](../interfaces/requestresult.md)<TSuccessData\>, IteratorResult<unknown, [RequestResult](../interfaces/requestresult.md)<TSuccessData\>\>\>

#### Type parameters

| Name           | Type                                   |
| :------------- | :------------------------------------- |
| `TSuccessData` | `TSuccessData` = `TSuccessDataDefault` |
| `TErrorData`   | `TErrorData` = `TErrorDataDefault`     |

#### Parameters

| Name             | Type                                            |
| :--------------- | :---------------------------------------------- |
| `url`            | `string`                                        |
| `requestConfig?` | [RequestConfig](../interfaces/requestconfig.md) |

#### Returns

`Generator`<unknown, [RequestResult](../interfaces/requestresult.md)<TSuccessData\>, IteratorResult<unknown, [RequestResult](../interfaces/requestresult.md)<TSuccessData\>\>\>

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:80](https://github.com/AckeeCZ/antonio/blob/8bc697c/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L80)

---

### options

▸ **options**<TSuccessData, TErrorData\>(`url`, `requestConfig?`): `Generator`<unknown, [RequestResult](../interfaces/requestresult.md)<TSuccessData\>, IteratorResult<unknown, [RequestResult](../interfaces/requestresult.md)<TSuccessData\>\>\>

#### Type parameters

| Name           | Type                                   |
| :------------- | :------------------------------------- |
| `TSuccessData` | `TSuccessData` = `TSuccessDataDefault` |
| `TErrorData`   | `TErrorData` = `TErrorDataDefault`     |

#### Parameters

| Name             | Type                                            |
| :--------------- | :---------------------------------------------- |
| `url`            | `string`                                        |
| `requestConfig?` | [RequestConfig](../interfaces/requestconfig.md) |

#### Returns

`Generator`<unknown, [RequestResult](../interfaces/requestresult.md)<TSuccessData\>, IteratorResult<unknown, [RequestResult](../interfaces/requestresult.md)<TSuccessData\>\>\>

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:87](https://github.com/AckeeCZ/antonio/blob/8bc697c/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L87)

---

### patch

▸ **patch**<TSuccessData, TErrorData\>(`url`, `body`, `requestConfig?`): `Generator`<unknown, [RequestResult](../interfaces/requestresult.md)<TSuccessData\>, IteratorResult<unknown, [RequestResult](../interfaces/requestresult.md)<TSuccessData\>\>\>

#### Type parameters

| Name           | Type                                   |
| :------------- | :------------------------------------- |
| `TSuccessData` | `TSuccessData` = `TSuccessDataDefault` |
| `TErrorData`   | `TErrorData` = `TErrorDataDefault`     |

#### Parameters

| Name             | Type                                             |
| :--------------- | :----------------------------------------------- |
| `url`            | `string`                                         |
| `body`           | [RequestBodyData](../modules.md#requestbodydata) |
| `requestConfig?` | [RequestConfig](../interfaces/requestconfig.md)  |

#### Returns

`Generator`<unknown, [RequestResult](../interfaces/requestresult.md)<TSuccessData\>, IteratorResult<unknown, [RequestResult](../interfaces/requestresult.md)<TSuccessData\>\>\>

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:58](https://github.com/AckeeCZ/antonio/blob/8bc697c/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L58)

---

### post

▸ **post**<TSuccessData, TErrorData\>(`url`, `body`, `requestConfig?`): `any`

#### Type parameters

| Name           | Type                                   |
| :------------- | :------------------------------------- |
| `TSuccessData` | `TSuccessData` = `TSuccessDataDefault` |
| `TErrorData`   | `TErrorData` = `TErrorDataDefault`     |

#### Parameters

| Name             | Type                                             |
| :--------------- | :----------------------------------------------- |
| `url`            | `string`                                         |
| `body`           | [RequestBodyData](../modules.md#requestbodydata) |
| `requestConfig?` | [RequestConfig](../interfaces/requestconfig.md)  |

#### Returns

`any`

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:42](https://github.com/AckeeCZ/antonio/blob/8bc697c/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L42)

---

### put

▸ **put**<TSuccessData, TErrorData\>(`url`, `body`, `requestConfig?`): `Generator`<unknown, [RequestResult](../interfaces/requestresult.md)<TSuccessData\>, IteratorResult<unknown, [RequestResult](../interfaces/requestresult.md)<TSuccessData\>\>\>

#### Type parameters

| Name           | Type                                   |
| :------------- | :------------------------------------- |
| `TSuccessData` | `TSuccessData` = `TSuccessDataDefault` |
| `TErrorData`   | `TErrorData` = `TErrorDataDefault`     |

#### Parameters

| Name             | Type                                             |
| :--------------- | :----------------------------------------------- |
| `url`            | `string`                                         |
| `body`           | [RequestBodyData](../modules.md#requestbodydata) |
| `requestConfig?` | [RequestConfig](../interfaces/requestconfig.md)  |

#### Returns

`Generator`<unknown, [RequestResult](../interfaces/requestresult.md)<TSuccessData\>, IteratorResult<unknown, [RequestResult](../interfaces/requestresult.md)<TSuccessData\>\>\>

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:50](https://github.com/AckeeCZ/antonio/blob/8bc697c/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L50)
