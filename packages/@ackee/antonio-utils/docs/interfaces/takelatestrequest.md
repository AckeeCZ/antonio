[@ackee/antonio-utils - v4.1.1](../README.md) / TakeLatestRequest

# Interface: TakeLatestRequest<RequestAction, CancelAction\>

## Type parameters

| Name            | Type                         |
| :-------------- | :--------------------------- |
| `RequestAction` | `RequestAction`: `AnyAction` |
| `CancelAction`  | `CancelAction`: `AnyAction`  |

## Table of contents

### Properties

-   [REQUEST](takelatestrequest.md#request)

### Methods

-   [cancelTask](takelatestrequest.md#canceltask)
-   [requestIdSelector](takelatestrequest.md#requestidselector)

## Properties

### REQUEST

• **REQUEST**: `ActionPattern`<RequestAction\>

#### Defined in

[types.ts:16](https://github.com/AckeeCZ/antonio/blob/e92d67e/packages/@ackee/antonio-utils/src/types.ts#L16)

## Methods

### cancelTask

▸ **cancelTask**(`requestId`, `action`): `CancelAction`

#### Parameters

| Name        | Type                                |
| :---------- | :---------------------------------- |
| `requestId` | [RequestId](../README.md#requestid) |
| `action`    | `AnyAction`                         |

#### Returns

`CancelAction`

#### Defined in

[types.ts:17](https://github.com/AckeeCZ/antonio/blob/e92d67e/packages/@ackee/antonio-utils/src/types.ts#L17)

---

### requestIdSelector

▸ `Optional` **requestIdSelector**(`action`): [RequestId](../README.md#requestid)

#### Parameters

| Name     | Type        |
| :------- | :---------- |
| `action` | `AnyAction` |

#### Returns

[RequestId](../README.md#requestid)

#### Defined in

[types.ts:18](https://github.com/AckeeCZ/antonio/blob/e92d67e/packages/@ackee/antonio-utils/src/types.ts#L18)
