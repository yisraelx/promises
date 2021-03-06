# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

<a name="0.5.0"></a>
# [0.5.0](https://github.com/yisraelx/promises/compare/v0.4.0...v0.5.0) (2018-07-16)


### Bug Fixes

* **interfaces:** ordering, error with objects, and rename fp interfaces ([fc28328](https://github.com/yisraelx/promises/commit/fc28328))
* **keys:** that if collection is Promise then is not resolve ([1e89c39](https://github.com/yisraelx/promises/commit/1e89c39))


### build

* move from webpack to rollup, compatibility changes ([47594dc](https://github.com/yisraelx/promises/commit/47594dc))


### Code Refactoring

* separates add and export, adds 'add' file to groups packages ([be1e7f6](https://github.com/yisraelx/promises/commit/be1e7f6))


### Features

* **fp:** convert fp to sub-package, and add fp to all group packages ([94bebb3](https://github.com/yisraelx/promises/commit/94bebb3))
* **fp:** move to conversion by [@pakal](https://github.com/pakal)/curry, add placeholder support ([ff18d23](https://github.com/yisraelx/promises/commit/ff18d23))
* add Tree-Shaking & esm support and convert "add" to sub-package ([0aa2297](https://github.com/yisraelx/promises/commit/0aa2297))


### Performance Improvements

* prevent unnecessary duplication of args ([bf1063a](https://github.com/yisraelx/promises/commit/bf1063a))


### BREAKING CHANGES

* change in wrapper use, for use in wrapper:
```typescript
import Promises from '@promises/-all/add';
```
*Or*
```typescript
import Promises from '@promises/core';
import '@promises/-all/add';
```
* **fp:** remove "@promises/-fp" package, use "@promises/-all/fp" sub-package instead.
* new compatibility support:
* main - commonjs module and es5 standard (index.js)
* es2015 - commonjs module and es2015 standard (index.es6.js)
* browser - bundle in umd format includes all scope dependencies in es5 standard (bundle.umd.js, bundle.umd.min.js)
* typings - typescript declaration file (index.d.ts)
* "add" does not export the "index" export, it only adds to Promises
```ts
import Promises from '@promises/core';
import '@promises/for-each-series/add';
```




<a name="0.4.0"></a>
# [0.4.0](https://github.com/yisraelx/promises/compare/v0.3.1...v0.4.0) (2018-03-17)


### Bug Fixes

* **error:** wrong return type ([2b6ba1c](https://github.com/yisraelx/promises/commit/2b6ba1c))
* **fromEvent:** wrong return type in rejection ([4ebc479](https://github.com/yisraelx/promises/commit/4ebc479))
* **keys:** remove method of handling keys ([1c622c0](https://github.com/yisraelx/promises/commit/1c622c0))


### Features

* Adding Functional programming support ([c801b97](https://github.com/yisraelx/promises/commit/c801b97))


### BREAKING CHANGES

* **keys:** the method no longer accepts the handling function, it should be moved to the
"then" method instead.




<a name="0.3.1"></a>
## [0.3.1](https://github.com/yisraelx/promises/compare/v0.3.0...v0.3.1) (2018-03-05)




**Note:** Version bump only for package promises

<a name="0.3.0"></a>
# [0.3.0](https://github.com/yisraelx/promises/compare/v0.2.0...v0.3.0) (2018-03-05)


### Bug Fixes

* **finally:** wrong return after rejection ([ddedc6a](https://github.com/yisraelx/promises/commit/ddedc6a))
* **retry:** change times default and preventing memory leakage and handling error options ([0288d2c](https://github.com/yisraelx/promises/commit/0288d2c))
* **toCallback:** wrong handling of errors ([c7f644b](https://github.com/yisraelx/promises/commit/c7f644b))


### Chores

* **package:** change of the export properties (main, browser, module, es2015) ([5a146dc](https://github.com/yisraelx/promises/commit/5a146dc))


### Code Refactoring

* all interfaces that did not start with the letter 'I' were fixed and now they start with ' ([8c8de27](https://github.com/yisraelx/promises/commit/8c8de27))


### Features

* ***parallel:** added an option to limit parallel operations ([5fa0282](https://github.com/yisraelx/promises/commit/5fa0282))
* add method doWhileParallel ([1cb37ec](https://github.com/yisraelx/promises/commit/1cb37ec))
* add method doWhileSeries ([9774683](https://github.com/yisraelx/promises/commit/9774683))
* add method forever ([6517568](https://github.com/yisraelx/promises/commit/6517568))
* add method fromCallback ([78acfa7](https://github.com/yisraelx/promises/commit/78acfa7))
* add method fromEvent ([41248df](https://github.com/yisraelx/promises/commit/41248df))
* add method wait ([7b68d41](https://github.com/yisraelx/promises/commit/7b68d41))
* add method whileParallel ([dbb2519](https://github.com/yisraelx/promises/commit/dbb2519))
* add method whileSeries ([4fcf07f](https://github.com/yisraelx/promises/commit/4fcf07f))
* change packages architecture and giving independence to modules/methods ([832216b](https://github.com/yisraelx/promises/commit/832216b))


### BREAKING CHANGES

* **standalone methods return 'Promise' instead of 'Promises'**

before
```ts
import method from '@promises/method';
let promises: Promises<any> = method<any>();
```

after
```ts
import method from '@promises/method';
let promise: Promise<any> = method<any>();
```

for Promises use Promises
```ts
import Promises from '@promises/-all';

let promises: Promises<any> = Promises.method<any>();
```
**changing the architecture of loading methods to 'Promises'**

before
```ts
import Promises from '@promises/core';
import method from '@promises/method';

method()
Promise.method()
```
```ts
import Promises from '@promises/core';
import '@promises/method';

Promise.method()
```

after
```ts
import
Promises from '@promises/core';
import method from '@promises/method';

method()
Promise.method() // throw Error
```
```ts
import Promises from '@promises/core';
import method from'@promises/method/add';

method()
Promise.method()
```
* **package:** change properties:
* main: umd.js => es5.js
* browser: umd.js => umd.min.js
* module: es5.js => index.js
* bundle: bundle.js => bundle.min.js
* rename all interfaces that did not start with the letter 'I'
