# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 2.4.0 - 2019-04-13

### Udpated

-   `@ackee/petrus@3.7.0`

### Added

-   Dispatch `verifyAccessTokenAvailability` action by `@ackee/petrus` on `401` response code status.

## 2.3.6 - 2019-02-25

### Updated

-   upgrade `@ackee/petrus` to `2.3.5` version

## 2.3.5 - 2019-02-14

### Fixed

-   `takeLatestRequest` effect

## 2.3.3 - 2019-02-07

### Fixed

-   merging custom with default configuration (`accessTokenUnavailableTimeout`)
-   property key typo (`SAGA_INITIALIZE` -> `SAGA_INITIALIZED`)

## 2.3.2 - 2019-02-07

### Fixed

-   custom saga effects: `takeRequest`, `takeLatestRequest`

### Updated

-   upgrade `@ackee/petrus` to version `3.3.0`

## 2.3.1 - 2019-02-04

### Updated

-   upgrade `@ackee/petrus` to version `3.2.3`

## 2.3.0 - 2019-02-04

### Updated

-   `takeLatestRequest` - add `requestIdSelector` param
-   upgrade dependencies
