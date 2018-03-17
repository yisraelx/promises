# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

<a name="0.4.0"></a>
# [0.4.0](https://github.com/yisraelx/promises/compare/v0.3.1...v0.4.0) (2018-03-17)




**Note:** Version bump only for package @promises/-prototype

<a name="0.3.1"></a>
## [0.3.1](https://github.com/yisraelx/promises/compare/v0.3.0...v0.3.1) (2018-03-05)




**Note:** Version bump only for package @promises/-prototype

<a name="0.3.0"></a>
# [0.3.0](https://github.com/yisraelx/promises/compare/v0.2.0...v0.3.0) (2018-03-05)


### Bug Fixes

* **retry:** change times default and preventing memory leakage and handling error options ([0288d2c](https://github.com/yisraelx/promises/commit/0288d2c))


### Chores

* **package:** change of the export properties (main, browser, module, es2015) ([5a146dc](https://github.com/yisraelx/promises/commit/5a146dc))


### Code Refactoring

* all interfaces that did not start with the letter 'I' were fixed and now they start with ' ([8c8de27](https://github.com/yisraelx/promises/commit/8c8de27))


### Features

* add method wait ([7b68d41](https://github.com/yisraelx/promises/commit/7b68d41))
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




<a name="0.2.0"></a>
# [0.2.0](https://github.com/yisraelx/promises/compare/v0.1.0...v0.2.0) (2017-09-20)


### Code Refactoring

* **delay:** move from prototype to constructor ([f59f19d](https://github.com/yisraelx/promises/commit/f59f19d))


### Features

* add method finally ([a88fee6](https://github.com/yisraelx/promises/commit/a88fee6))
* add method next ([04c6d44](https://github.com/yisraelx/promises/commit/04c6d44))
* add method sleep ([a75a15b](https://github.com/yisraelx/promises/commit/a75a15b))


### BREAKING CHANGES

* **delay:** The api of the method changed because of the move to constructor and the method is
no longer on prototype.




<a name="0.1.0"></a>
# 0.1.0 (2017-06-24)


### Features

* first commit ([00d9fb7](https://github.com/yisraelx/promises/commit/00d9fb7))
