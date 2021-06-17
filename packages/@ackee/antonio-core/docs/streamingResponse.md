## Streaming response

The `fetch` API provides several methods for transforming the body.

```js
        while (true) {
            const { done, value } = yield data.next();

            if (done) break;

            const { result, entities } = Normalize.articles(value);

            yield put(
                actions.fetchArticlesSuccess(
                    groupId,
                    {
                        ids: result,
                        byId: entities[EntityKeys.ARTICLES],
                    },
                    {
                        totalCount: Number.parseInt(response.headers.get(HeaderNames.X_TOTAL_COUNT), 10),
                    },
                ),
            );
        }
```
