![ackee|Antonio](assets/ackee_git_frontend_antonio.png)

# [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/AckeeCZ/antonio/blob/master/LICENSE) [![CI Status](https://img.shields.io/travis/com/AckeeCZ/antonio.svg?style=flat)](https://travis-ci.com/AckeeCZ/antonio) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://reactjs.org/docs/how-to-contribute.html#your-first-pull-request) [![Dependency Status](https://img.shields.io/david/AckeeCZ/antonio.svg?style=flat-square)](https://david-dm.org/AckeeCZ/antonio) [![bundlephobia](https://flat.badgen.net/bundlephobia/min/@ackee/antonio)](https://bundlephobia.com/result?p=@ackee/antonio) [![bundlephobia](https://flat.badgen.net/bundlephobia/minzip/@ackee/antonio)](https://bundlephobia.com/result?p=@ackee/antonio)

# Antonio

A HTTP client built on Fetch API with similar API to [axios](https://github.com/axios/axios).

## Table of contents

-   [Installing](#installing)
-   [Setup](#setup)
-   [API](#api)

---

## <a name="installing"></a>Installing

```bash
$ yarn add @ackee/antonio -S
```

---

## <a name="setup"></a>Setup

Create a new instance and you're ready to go.

```js
import { create } from '@ackee/antonio';

export const api = create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
});
```
