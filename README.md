![ackee|Antonio](assets/ackee_git_frontend_antonio.png)

# ![node version](https://img.shields.io/node/v/@ackee/antonio-auth) ![@ackee/antonio license](https://img.shields.io/github/license/ackeecz/antonio)

# Antonio

HTTP client built on top of `fetch` API inspired by API design of [axios](https://github.com/axios/axios).

## Monorepo structure

-   [@ackee/antonio-core](packages/@ackee/antonio-core/README.md) - The HTTP client.
-   [@ackee/antonio-utils](packages/@ackee/antonio-utils/README.md) - Custom redux-saga effects for canceling request.
-   [@ackee/antonio-auth](packages/@ackee/antonio-auth/README.md) - A request interceptor which sets the `Authorization` header to access token obtained from [@ackee/petrus](https://github.com/AckeeCZ/petrus).

![@ackee/antonio_monorepo_dependency_graph](assets/dependecy-graph.png)

## Browsers support

It's compatible with all browsers in [`@ackee/browserslist-config`](https://github.com/AckeeCZ/browserslist-config).
