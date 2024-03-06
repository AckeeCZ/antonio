[@ackee/antonio-core - v4.1.1](../README.md) / Antonio

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
-   [request](antonio.md#request)

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

| Name             | Type                                                    |
| :--------------- | :------------------------------------------------------ |
| `requestConfig?` | [RequestConfig](../interfaces/requestconfig.md)         |
| `generalConfig?` | `Partial`<[GeneralConfig](../README.md#generalconfig)\> |

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:30](https://github.com/AckeeCZ/antonio/blob/e92d67e/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L30)

## Properties

### defaults

• `Readonly` **defaults**: `DefaultRequestConfig`

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:28](https://github.com/AckeeCZ/antonio/blob/e92d67e/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L28)

---

### generalConfig

• `Readonly` **generalConfig**: [GeneralConfig](../README.md#generalconfig)

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:30](https://github.com/AckeeCZ/antonio/blob/e92d67e/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L30)

---

### interceptors

• `Readonly` **interceptors**: `InterceptorManagers`

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:29](https://github.com/AckeeCZ/antonio/blob/e92d67e/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L29)

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

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:98](https://github.com/AckeeCZ/antonio/blob/e92d67e/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L98)

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

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:91](https://github.com/AckeeCZ/antonio/blob/e92d67e/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L91)

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

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:105](https://github.com/AckeeCZ/antonio/blob/e92d67e/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L105)

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

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:112](https://github.com/AckeeCZ/antonio/blob/e92d67e/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L112)

---

### patch

▸ **patch**<TSuccessData, TErrorData\>(`url`, `body`, `requestConfig?`): `Generator`<unknown, [RequestResult](../interfaces/requestresult.md)<TSuccessData\>, IteratorResult<unknown, [RequestResult](../interfaces/requestresult.md)<TSuccessData\>\>\>

#### Type parameters

| Name           | Type                                   |
| :------------- | :------------------------------------- |
| `TSuccessData` | `TSuccessData` = `TSuccessDataDefault` |
| `TErrorData`   | `TErrorData` = `TErrorDataDefault`     |

#### Parameters

| Name             | Type                                            |
| :--------------- | :---------------------------------------------- |
| `url`            | `string`                                        |
| `body`           | [RequestBodyData](../README.md#requestbodydata) |
| `requestConfig?` | [RequestConfig](../interfaces/requestconfig.md) |

#### Returns

`Generator`<unknown, [RequestResult](../interfaces/requestresult.md)<TSuccessData\>, IteratorResult<unknown, [RequestResult](../interfaces/requestresult.md)<TSuccessData\>\>\>

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:83](https://github.com/AckeeCZ/antonio/blob/e92d67e/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L83)

---

### post

▸ **post**<TSuccessData, TErrorData\>(`url`, `body`, `requestConfig?`): `any`

#### Type parameters

| Name           | Type                                   |
| :------------- | :------------------------------------- |
| `TSuccessData` | `TSuccessData` = `TSuccessDataDefault` |
| `TErrorData`   | `TErrorData` = `TErrorDataDefault`     |

#### Parameters

| Name             | Type                                            |
| :--------------- | :---------------------------------------------- |
| `url`            | `string`                                        |
| `body`           | [RequestBodyData](../README.md#requestbodydata) |
| `requestConfig?` | [RequestConfig](../interfaces/requestconfig.md) |

#### Returns

`any`

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:67](https://github.com/AckeeCZ/antonio/blob/e92d67e/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L67)

---

### put

▸ **put**<TSuccessData, TErrorData\>(`url`, `body`, `requestConfig?`): `Generator`<unknown, [RequestResult](../interfaces/requestresult.md)<TSuccessData\>, IteratorResult<unknown, [RequestResult](../interfaces/requestresult.md)<TSuccessData\>\>\>

#### Type parameters

| Name           | Type                                   |
| :------------- | :------------------------------------- |
| `TSuccessData` | `TSuccessData` = `TSuccessDataDefault` |
| `TErrorData`   | `TErrorData` = `TErrorDataDefault`     |

#### Parameters

| Name             | Type                                            |
| :--------------- | :---------------------------------------------- |
| `url`            | `string`                                        |
| `body`           | [RequestBodyData](../README.md#requestbodydata) |
| `requestConfig?` | [RequestConfig](../interfaces/requestconfig.md) |

#### Returns

`Generator`<unknown, [RequestResult](../interfaces/requestresult.md)<TSuccessData\>, IteratorResult<unknown, [RequestResult](../interfaces/requestresult.md)<TSuccessData\>\>\>

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:75](https://github.com/AckeeCZ/antonio/blob/e92d67e/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L75)

---

### request

▸ **request**<RM, TSuccessData, TErrorData\>(`props`): `Promise`<[RequestResult](../interfaces/requestresult.md)<TSuccessData\>\>

#### Type parameters

| Name           | Type                                              |
| :------------- | :------------------------------------------------ |
| `RM`           | `RM`: [RequestMethod](../README.md#requestmethod) |
| `TSuccessData` | `TSuccessData` = `TSuccessDataDefault`            |
| `TErrorData`   | `TErrorData` = `TErrorDataDefault`                |

#### Parameters

| Name    | Type                                                                                                                                                                                                                                                              |
| :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `props` | `Readonly`<[RequestConfig](../interfaces/requestconfig.md) & `RM` extends `"POST"` \| `"PUT"` \| `"PATCH"` ? { `body`: `Required`<[RequestBodyData](../README.md#requestbodydata)\> ; `method`: `RM` ; `url`: `string` } : { `method`: `RM` ; `url`: `string` }\> |

#### Returns

`Promise`<[RequestResult](../interfaces/requestresult.md)<TSuccessData\>\>

#### Defined in

[packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts:56](https://github.com/AckeeCZ/antonio/blob/e92d67e/packages/@ackee/antonio-core/src/modules/core/models/Antonio.ts#L56)
