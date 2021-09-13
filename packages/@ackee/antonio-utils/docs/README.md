@ackee/antonio-utils - v4.0.4

# @ackee/antonio-utils - v4.0.4

## Table of contents

### Interfaces

-   [TakeLatestRequest](interfaces/takelatestrequest.md)
-   [TakeRequest](interfaces/takerequest.md)

### Type aliases

-   [RequestId](README.md#requestid)

### Functions

-   [setAuthHeader](README.md#setauthheader)
-   [takeLatestRequest](README.md#takelatestrequest)
-   [takeRequest](README.md#takerequest)

## Type aliases

### RequestId

Ƭ **RequestId**: `symbol` \| `string` \| `number`

#### Defined in

[types.ts:15](https://github.com/AckeeCZ/antonio/blob/326f728/packages/@ackee/antonio-utils/src/types.ts#L15)

## Functions

### setAuthHeader

▸ **setAuthHeader**(`headers`, `tokenValue?`, `tokenType?`): `void`

#### Parameters

| Name          | Type      |
| :------------ | :-------- |
| `headers`     | `Headers` |
| `tokenValue?` | `string`  |
| `tokenType`   | `string`  |

#### Returns

`void`

#### Defined in

[setAuthHeader.ts:5](https://github.com/AckeeCZ/antonio/blob/326f728/packages/@ackee/antonio-utils/src/setAuthHeader.ts#L5)

---

### takeLatestRequest

▸ **takeLatestRequest**(`__namedParameters`, `requestHandler`): `Generator`<ForkEffect<never\>, void, unknown\>

#### Parameters

| Name                | Type                                                 |
| :------------------ | :--------------------------------------------------- |
| `__namedParameters` | [TakeLatestRequest](interfaces/takelatestrequest.md) |
| `requestHandler`    | `RequestHandler`                                     |

#### Returns

`Generator`<ForkEffect<never\>, void, unknown\>

#### Defined in

[saga-effects/takeLatestRequest.ts:6](https://github.com/AckeeCZ/antonio/blob/326f728/packages/@ackee/antonio-utils/src/saga-effects/takeLatestRequest.ts#L6)

---

### takeRequest

▸ **takeRequest**(`actionTypes`, `handler`): `Generator`<TakeEffect \| Generator<RaceEffect<CallEffect<void\> \| TakeEffect\>, void, unknown\>, void, unknown\>

Blocking custom saga effect that can cancel the API request

#### Parameters

| Name          | Type                                     |
| :------------ | :--------------------------------------- |
| `actionTypes` | [TakeRequest](interfaces/takerequest.md) |
| `handler`     | `RequestHandler`                         |

#### Returns

`Generator`<TakeEffect \| Generator<RaceEffect<CallEffect<void\> \| TakeEffect\>, void, unknown\>, void, unknown\>

#### Defined in

[saga-effects/takeRequest.ts:8](https://github.com/AckeeCZ/antonio/blob/326f728/packages/@ackee/antonio-utils/src/saga-effects/takeRequest.ts#L8)
