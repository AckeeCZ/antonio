[@ackee/antonio-core - v4.0.0-beta.38](../README.md) / RequestResult

# Interface: RequestResult<D\>

## Type parameters

| Name | Type        |
| :--- | :---------- |
| `D`  | `D` = `any` |

## Table of contents

### Properties

-   [config](requestresult.md#config)
-   [data](requestresult.md#data)
-   [headers](requestresult.md#headers)
-   [request](requestresult.md#request)
-   [response](requestresult.md#response)
-   [status](requestresult.md#status)
-   [statusText](requestresult.md#statustext)

## Properties

### config

• **config**: `Object`

**`deprecated`** This prop is going to be removed in next major relase. Depend on properties in the `request`.

#### Defined in

[packages/@ackee/antonio-core/src/types.ts:179](https://github.com/AckeeCZ/antonio/blob/fab9e7b/packages/@ackee/antonio-core/src/types.ts#L179)

---

### data

• **data**: `D`

#### Defined in

[packages/@ackee/antonio-core/src/types.ts:159](https://github.com/AckeeCZ/antonio/blob/fab9e7b/packages/@ackee/antonio-core/src/types.ts#L159)

---

### headers

• **headers**: `Object`

**`deprecated`** This prop is going to be removed in next major relase. Use `response.headers` instead.

#### Defined in

[packages/@ackee/antonio-core/src/types.ts:174](https://github.com/AckeeCZ/antonio/blob/fab9e7b/packages/@ackee/antonio-core/src/types.ts#L174)

---

### request

• **request**: `Request`

#### Defined in

[packages/@ackee/antonio-core/src/types.ts:157](https://github.com/AckeeCZ/antonio/blob/fab9e7b/packages/@ackee/antonio-core/src/types.ts#L157)

---

### response

• **response**: `Response`

#### Defined in

[packages/@ackee/antonio-core/src/types.ts:158](https://github.com/AckeeCZ/antonio/blob/fab9e7b/packages/@ackee/antonio-core/src/types.ts#L158)

---

### status

• **status**: `number`

**`deprecated`** This prop is going to be removed in next major relase. Use `response.status` instead.

#### Defined in

[packages/@ackee/antonio-core/src/types.ts:164](https://github.com/AckeeCZ/antonio/blob/fab9e7b/packages/@ackee/antonio-core/src/types.ts#L164)

---

### statusText

• **statusText**: `string`

**`deprecated`** This prop is going to be removed in next major relase. Use `response.statusText` instead.

#### Defined in

[packages/@ackee/antonio-core/src/types.ts:169](https://github.com/AckeeCZ/antonio/blob/fab9e7b/packages/@ackee/antonio-core/src/types.ts#L169)
