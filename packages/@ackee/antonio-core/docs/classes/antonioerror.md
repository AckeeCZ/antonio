[@ackee/antonio-core - v4.0.0-beta.38](../README.md) / [Exports](../modules.md) / AntonioError

# Class: AntonioError<D\>

## Type parameters

| Name | Type            |
| :--- | :-------------- |
| `D`  | `D` = `unknown` |

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

• **new AntonioError**<D\>(`request`, `response`, `data`)

#### Type parameters

| Name | Type            |
| :--- | :-------------- |
| `D`  | `D` = `unknown` |

#### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `request`  | `Request`  |
| `response` | `Response` |
| `data`     | `D`        |

#### Overrides

Error.constructor

#### Defined in

[packages/@ackee/antonio-core/src/modules/response/errors/index.ts:8](https://github.com/AckeeCZ/antonio/blob/8bc697c/packages/@ackee/antonio-core/src/modules/response/errors/index.ts#L8)

## Properties

### data

• **data**: `D`

#### Defined in

[packages/@ackee/antonio-core/src/modules/response/errors/index.ts:7](https://github.com/AckeeCZ/antonio/blob/8bc697c/packages/@ackee/antonio-core/src/modules/response/errors/index.ts#L7)

---

### isAntonioError

• **isAntonioError**: `true`

#### Defined in

[packages/@ackee/antonio-core/src/modules/response/errors/index.ts:8](https://github.com/AckeeCZ/antonio/blob/8bc697c/packages/@ackee/antonio-core/src/modules/response/errors/index.ts#L8)

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

[packages/@ackee/antonio-core/src/modules/response/errors/index.ts:4](https://github.com/AckeeCZ/antonio/blob/8bc697c/packages/@ackee/antonio-core/src/modules/response/errors/index.ts#L4)

---

### request

• **request**: `Request`

#### Defined in

[packages/@ackee/antonio-core/src/modules/response/errors/index.ts:5](https://github.com/AckeeCZ/antonio/blob/8bc697c/packages/@ackee/antonio-core/src/modules/response/errors/index.ts#L5)

---

### response

• **response**: `Response`

#### Defined in

[packages/@ackee/antonio-core/src/modules/response/errors/index.ts:6](https://github.com/AckeeCZ/antonio/blob/8bc697c/packages/@ackee/antonio-core/src/modules/response/errors/index.ts#L6)

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
