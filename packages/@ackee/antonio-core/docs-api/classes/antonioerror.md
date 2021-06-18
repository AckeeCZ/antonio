[@ackee/antonio-core](../README.md) / [Exports](../modules.md) / AntonioError

# Class: AntonioError

## Hierarchy

-   `Error`

    ↳ **AntonioError**

## Table of contents

### Constructors

-   [constructor](antonioerror.md#constructor)

### Properties

-   [data](antonioerror.md#data)
-   [isAntonioError](antonioerror.md#isantonioerror)
-   [message](antonioerror.md#message)
-   [name](antonioerror.md#name)
-   [request](antonioerror.md#request)
-   [response](antonioerror.md#response)
-   [stack](antonioerror.md#stack)
-   [prepareStackTrace](antonioerror.md#preparestacktrace)
-   [stackTraceLimit](antonioerror.md#stacktracelimit)

### Methods

-   [captureStackTrace](antonioerror.md#capturestacktrace)

## Constructors

### constructor

• **new AntonioError**(`request`, `response`, `data`)

#### Parameters

| Name       | Type                                       |
| :--------- | :----------------------------------------- |
| `request`  | `Request`                                  |
| `response` | `Response`                                 |
| `data`     | [ResponseData](../modules.md#responsedata) |

#### Overrides

Error.constructor

#### Defined in

[packages/@ackee/antonio-core/src/modules/response/errors/index.ts:11](https://github.com/AckeeCZ/antonio/blob/70b57b9/packages/@ackee/antonio-core/src/modules/response/errors/index.ts#L11)

## Properties

### data

• **data**: [ResponseData](../modules.md#responsedata)

#### Defined in

[packages/@ackee/antonio-core/src/modules/response/errors/index.ts:10](https://github.com/AckeeCZ/antonio/blob/70b57b9/packages/@ackee/antonio-core/src/modules/response/errors/index.ts#L10)

---

### isAntonioError

• **isAntonioError**: `true`

#### Defined in

[packages/@ackee/antonio-core/src/modules/response/errors/index.ts:11](https://github.com/AckeeCZ/antonio/blob/70b57b9/packages/@ackee/antonio-core/src/modules/response/errors/index.ts#L11)

---

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:974

---

### name

• **name**: `"AntonioError"`

#### Overrides

Error.name

#### Defined in

[packages/@ackee/antonio-core/src/modules/response/errors/index.ts:7](https://github.com/AckeeCZ/antonio/blob/70b57b9/packages/@ackee/antonio-core/src/modules/response/errors/index.ts#L7)

---

### request

• **request**: `Request`

#### Defined in

[packages/@ackee/antonio-core/src/modules/response/errors/index.ts:8](https://github.com/AckeeCZ/antonio/blob/70b57b9/packages/@ackee/antonio-core/src/modules/response/errors/index.ts#L8)

---

### response

• **response**: `Response`

#### Defined in

[packages/@ackee/antonio-core/src/modules/response/errors/index.ts:9](https://github.com/AckeeCZ/antonio/blob/70b57b9/packages/@ackee/antonio-core/src/modules/response/errors/index.ts#L9)

---

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:975

---

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

##### Parameters

| Name          | Type         |
| :------------ | :----------- |
| `err`         | `Error`      |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

#### Inherited from

Error.prepareStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:11

---

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

#### Defined in

node_modules/@types/node/globals.d.ts:13

## Methods

### captureStackTrace

▸ `Static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name              | Type       |
| :---------------- | :--------- |
| `targetObject`    | `object`   |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

Error.captureStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:4
