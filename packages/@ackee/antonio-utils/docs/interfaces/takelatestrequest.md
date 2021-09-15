[@ackee/antonio-utils - v4.0.5](../README.md) / TakeLatestRequest

# Interface: TakeLatestRequest

## Table of contents

### Properties

-   [REQUEST](takelatestrequest.md#request)
-   [cancelTask](takelatestrequest.md#canceltask)
-   [requestIdSelector](takelatestrequest.md#requestidselector)

## Properties

### REQUEST

• **REQUEST**: `ActionPattern`<Action<any\>\>

#### Defined in

[types.ts:18](https://github.com/AckeeCZ/antonio/blob/27c90ed/packages/@ackee/antonio-utils/src/types.ts#L18)

---

### cancelTask

• **cancelTask**: (`requestId`: [RequestId](../README.md#requestid), `action`: `AnyAction`) => `AnyAction`

#### Type declaration

▸ (`requestId`, `action`): `AnyAction`

##### Parameters

| Name        | Type                                |
| :---------- | :---------------------------------- |
| `requestId` | [RequestId](../README.md#requestid) |
| `action`    | `AnyAction`                         |

##### Returns

`AnyAction`

#### Defined in

[types.ts:19](https://github.com/AckeeCZ/antonio/blob/27c90ed/packages/@ackee/antonio-utils/src/types.ts#L19)

---

### requestIdSelector

• `Optional` **requestIdSelector**: (`action`: `AnyAction`) => [RequestId](../README.md#requestid)

#### Type declaration

▸ (`action`): [RequestId](../README.md#requestid)

##### Parameters

| Name     | Type        |
| :------- | :---------- |
| `action` | `AnyAction` |

##### Returns

[RequestId](../README.md#requestid)

#### Defined in

[types.ts:20](https://github.com/AckeeCZ/antonio/blob/27c90ed/packages/@ackee/antonio-utils/src/types.ts#L20)
