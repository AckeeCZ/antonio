[@ackee/antonio-core](../README.md) / [Exports](../modules.md) / FullRequestConfig

# Interface: FullRequestConfig

## Hierarchy

-   `Omit`<RequestInit, `"body"` \| `"headers"` \| `"method"`\>

    ↳ **FullRequestConfig**

## Table of contents

### Properties

-   [baseURL](fullrequestconfig.md#baseurl)
-   [cache](fullrequestconfig.md#cache)
-   [credentials](fullrequestconfig.md#credentials)
-   [headers](fullrequestconfig.md#headers)
-   [integrity](fullrequestconfig.md#integrity)
-   [keepalive](fullrequestconfig.md#keepalive)
-   [mode](fullrequestconfig.md#mode)
-   [params](fullrequestconfig.md#params)
-   [redirect](fullrequestconfig.md#redirect)
-   [referrer](fullrequestconfig.md#referrer)
-   [referrerPolicy](fullrequestconfig.md#referrerpolicy)
-   [responseDataType](fullrequestconfig.md#responsedatatype)
-   [signal](fullrequestconfig.md#signal)
-   [uriParams](fullrequestconfig.md#uriparams)
-   [window](fullrequestconfig.md#window)

## Properties

### baseURL

• **baseURL**: `string`

`baseURL` will be prepended to `url` unless `url` is absolute.
It can be convenient to set `baseURL` for an instance of antonio to pass relative URLs.

#### Defined in

[packages/@ackee/antonio-core/src/types.ts:133](https://github.com/AckeeCZ/antonio/blob/70b57b9/packages/@ackee/antonio-core/src/types.ts#L133)

---

### cache

• `Optional` **cache**: `RequestCache`

A string indicating how the request will interact with the browser's cache to set request's cache.

#### Inherited from

Omit.cache

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:1610

---

### credentials

• `Optional` **credentials**: `RequestCredentials`

A string indicating whether credentials will be sent with the request always, never, or only when sent to a same-origin URL. Sets request's credentials.

#### Inherited from

Omit.credentials

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:1614

---

### headers

• **headers**: [RequestHeaders](../modules.md#requestheaders)

#### Defined in

[packages/@ackee/antonio-core/src/types.ts:139](https://github.com/AckeeCZ/antonio/blob/70b57b9/packages/@ackee/antonio-core/src/types.ts#L139)

---

### integrity

• `Optional` **integrity**: `string`

A cryptographic hash of the resource to be fetched by request. Sets request's integrity.

#### Inherited from

Omit.integrity

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:1622

---

### keepalive

• `Optional` **keepalive**: `boolean`

A boolean to set request's keepalive.

#### Inherited from

Omit.keepalive

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:1626

---

### mode

• `Optional` **mode**: `RequestMode`

A string to indicate whether the request will use CORS, or will be restricted to same-origin URLs. Sets request's mode.

#### Inherited from

Omit.mode

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:1634

---

### params

• **params**: [RequestSearchParams](../modules.md#requestsearchparams)

#### Defined in

[packages/@ackee/antonio-core/src/types.ts:141](https://github.com/AckeeCZ/antonio/blob/70b57b9/packages/@ackee/antonio-core/src/types.ts#L141)

---

### redirect

• `Optional` **redirect**: `RequestRedirect`

A string indicating whether request follows redirects, results in an error upon encountering a redirect, or returns the redirect (in an opaque fashion). Sets request's redirect.

#### Inherited from

Omit.redirect

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:1638

---

### referrer

• `Optional` **referrer**: `string`

A string whose value is a same-origin URL, "about:client", or the empty string, to set request's referrer.

#### Inherited from

Omit.referrer

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:1642

---

### referrerPolicy

• `Optional` **referrerPolicy**: `ReferrerPolicy`

A referrer policy to set request's referrerPolicy.

#### Inherited from

Omit.referrerPolicy

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:1646

---

### responseDataType

• **responseDataType**: [ResponseDataType](../modules.md#responsedatatype)

#### Defined in

[packages/@ackee/antonio-core/src/types.ts:135](https://github.com/AckeeCZ/antonio/blob/70b57b9/packages/@ackee/antonio-core/src/types.ts#L135)

---

### signal

• `Optional` **signal**: `null` \| `AbortSignal`

An AbortSignal to set request's signal.

#### Inherited from

Omit.signal

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:1650

---

### uriParams

• **uriParams**: `Params`

#### Defined in

[packages/@ackee/antonio-core/src/types.ts:137](https://github.com/AckeeCZ/antonio/blob/70b57b9/packages/@ackee/antonio-core/src/types.ts#L137)

---

### window

• `Optional` **window**: `any`

Can only be null. Used to disassociate request from any Window.

#### Inherited from

Omit.window

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:1654
