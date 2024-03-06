[@ackee/antonio-core - v4.1.1](../README.md) / RequestConfig

# Interface: RequestConfig

## Hierarchy

-   `Omit`<RequestInit, `"body"` \| `"headers"` \| `"method"`\>

    ↳ **RequestConfig**

## Table of contents

### Properties

-   [baseURL](requestconfig.md#baseurl)
-   [cache](requestconfig.md#cache)
-   [credentials](requestconfig.md#credentials)
-   [headers](requestconfig.md#headers)
-   [integrity](requestconfig.md#integrity)
-   [keepalive](requestconfig.md#keepalive)
-   [mode](requestconfig.md#mode)
-   [params](requestconfig.md#params)
-   [redirect](requestconfig.md#redirect)
-   [referrer](requestconfig.md#referrer)
-   [referrerPolicy](requestconfig.md#referrerpolicy)
-   [responseDataType](requestconfig.md#responsedatatype)
-   [signal](requestconfig.md#signal)
-   [uriParams](requestconfig.md#uriparams)
-   [window](requestconfig.md#window)

## Properties

### baseURL

• `Optional` **baseURL**: `string`

`baseURL` will be prepended to `url` unless `url` is absolute.
It can be convenient to set `baseURL` for an instance of antonio to pass relative URLs.

#### Defined in

[packages/@ackee/antonio-core/src/types.ts:140](https://github.com/AckeeCZ/antonio/blob/e92d67e/packages/@ackee/antonio-core/src/types.ts#L140)

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

• `Optional` **headers**: [RequestHeaders](../README.md#requestheaders)

#### Defined in

[packages/@ackee/antonio-core/src/types.ts:146](https://github.com/AckeeCZ/antonio/blob/e92d67e/packages/@ackee/antonio-core/src/types.ts#L146)

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

• `Optional` **params**: [RequestSearchParams](../README.md#requestsearchparams)

#### Defined in

[packages/@ackee/antonio-core/src/types.ts:148](https://github.com/AckeeCZ/antonio/blob/e92d67e/packages/@ackee/antonio-core/src/types.ts#L148)

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

• `Optional` **responseDataType**: [ResponseDataType](../README.md#responsedatatype)

#### Defined in

[packages/@ackee/antonio-core/src/types.ts:142](https://github.com/AckeeCZ/antonio/blob/e92d67e/packages/@ackee/antonio-core/src/types.ts#L142)

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

• `Optional` **uriParams**: [RequestUriParams](../README.md#requesturiparams)

#### Defined in

[packages/@ackee/antonio-core/src/types.ts:144](https://github.com/AckeeCZ/antonio/blob/e92d67e/packages/@ackee/antonio-core/src/types.ts#L144)

---

### window

• `Optional` **window**: `any`

Can only be null. Used to disassociate request from any Window.

#### Inherited from

Omit.window

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:1654
