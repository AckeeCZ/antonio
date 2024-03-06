@ackee/antonio-utils - v4.1.1

# @ackee/antonio-utils - v4.1.1

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

[types.ts:13](https://github.com/AckeeCZ/antonio/blob/e92d67e/packages/@ackee/antonio-utils/src/types.ts#L13)

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

[setAuthHeader.ts:5](https://github.com/AckeeCZ/antonio/blob/e92d67e/packages/@ackee/antonio-utils/src/setAuthHeader.ts#L5)

---

### takeLatestRequest

▸ **takeLatestRequest**<RequestAction, CancelAction\>(`__namedParameters`, `requestHandler`): `Generator`<ForkEffect<never\>, void, unknown\>

#### Type parameters

| Name            | Type                                                       |
| :-------------- | :--------------------------------------------------------- |
| `RequestAction` | `RequestAction`: `AnyAction`<RequestAction\> = `AnyAction` |
| `CancelAction`  | `CancelAction`: `AnyAction`<CancelAction\> = `AnyAction`   |

#### Parameters

| Name                | Type                                                                               |
| :------------------ | :--------------------------------------------------------------------------------- |
| `__namedParameters` | [TakeLatestRequest](interfaces/takelatestrequest.md)<RequestAction, CancelAction\> |
| `requestHandler`    | `RequestHandler`<RequestAction\>                                                   |

#### Returns

`Generator`<ForkEffect<never\>, void, unknown\>

#### Defined in

[saga-effects/takeLatestRequest.ts:8](https://github.com/AckeeCZ/antonio/blob/e92d67e/packages/@ackee/antonio-utils/src/saga-effects/takeLatestRequest.ts#L8)

---

### takeRequest

▸ **takeRequest**<RequestAction\>(`actionTypes`, `handler`): `Generator`<TakeEffect \| Generator<RaceEffect<CallEffect<void\> \| TakeEffect\>, void, unknown\>, void, unknown\>

Blocking custom saga effect that can cancel the API request

#### Type parameters

| Name            | Type                                                       |
| :-------------- | :--------------------------------------------------------- |
| `RequestAction` | `RequestAction`: `AnyAction`<RequestAction\> = `AnyAction` |

#### Parameters

| Name          | Type                                     |
| :------------ | :--------------------------------------- |
| `actionTypes` | [TakeRequest](interfaces/takerequest.md) |
| `handler`     | `RequestHandler`<RequestAction\>         |

#### Returns

`Generator`<TakeEffect \| Generator<RaceEffect<CallEffect<void\> \| TakeEffect\>, void, unknown\>, void, unknown\>

#### Defined in

[saga-effects/takeRequest.ts:9](https://github.com/AckeeCZ/antonio/blob/e92d67e/packages/@ackee/antonio-utils/src/saga-effects/takeRequest.ts#L9)
