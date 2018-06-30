# Promises
[![Travis build](https://travis-ci.org/yisraelx/promises.svg?branch=master)](https://travis-ci.org/yisraelx/promises)
[![Codecov](https://codecov.io/gh/yisraelx/promises/branch/master/graph/badge.svg)](https://codecov.io/gh/yisraelx/promises)
[![MIT License](https://img.shields.io/npm/l/@promises/core.svg)](https://github.com/yisraelx/promises/blob/master/LICENSE)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

**Promises is utilities modules for promises, written in typescript.**

## Packages structure
* **The code is divided into many small modules and each module is a package in itself ([Packages List](https://github.com/yisraelx/promises/blob/master/PACKAGES.md)).**
* **Each package in the scoop has only one function or class and it in the default export of the package.**
* **Group package brings together several modules from the scope, and in the export has access to all modules.**

**Marks:**
* "**-**": **@{scope}/-{name}** - Group package
* "**_**": **@{scope}/_{name}** - Internal package

## Install
*Installation of a group of all packages in scoop @promises*
```sh
$ npm install --save @promises/-all
```
*Installation of a single package from scoop @promises*
```sh
$ npm install --save @promises/for-each-series
```

## Use
**Modules**
```typescript
import { filterSeries } from '@promises/-all';
```
*Or import only the module you need*
```typescript
import { default as forEachSeries } from '@promises/for-each-series'; 
```
**Browser**
```html
<script src="https://unpkg.com/@promises/-all/bundle.umd.min.js"><script>
```
*Or import only the module you need*
```html
<script src="https://unpkg.com/@promises/for-each-series/bundle.umd.min.js"><script>
```
```typescript
let { forEachSeries } = P;
```
**Example**
```typescript
import mapSeries from '@promises/map-series';
let array: number[] = [1, 2, 3];
let map: Promise<number[]> = mapSeries(array, (value: number, index: number, array: number[]) => {
    return value * index;
});
map.then((result: number[]) => {
    console.log(result) // => [0, 2, 6]
});
```

### Functional programming
**Modules**
```typescript
import { rejectSeries } from '@promises/-all/fp';
```
*Or import only the module you need*
```typescript
import { default as mapParallel } from '@promises/map-parallel/fp'; 
```
**Browser**
```html
<script src="https://unpkg.com/@promises/-all/fp/bundle.umd.min.js"><script>
```
*Or import only the module you need*
```html
<script src="https://unpkg.com/@promises/every-parallel/fp/bundle.umd.min.js"><script>
```
```typescript
let { everyParallel } = PF;
```
**Example**
```typescript
import filterParallel from '@promises/filter-parallel/fp';
import mapParallel from '@promises/map-parallel/fp';
import { sleep } from '@promises/-all/fp';

let array: number[] = [1, 2, 3];
let filterOdd = filterParallel((value: number) => value % 2 !== 0)(Infinity);
let sleepSecond = sleep(1000);

Promise
    .resolve(array)
    .then(filterOdd)
    .then(mapParallel((value: number, index: number) => value + index, void 0))
    .then(sleepSecond)
    .then((result: number[]) => {
        console.log(result) // => [1, 4]
    });
    
```

### wrapper
**Modules**

*it will add all the modules in the group to Promises*
```typescript
import { Promises } from '@promises/-all';
```
*Or*
```typescript
import Promises from '@promises/core';
import '@promises/-all/add';
```
*Or add all modules in specific groups*
```typescript
import Promises from '@promises/core';
import '@promises/-series/add';
import '@promises/-rxjs/add';
```
*Or add specific modules*
```typescript
import Promises from '@promises/core';
import '@promises/filter-parallel/add';
import '@promises/map-parallel/add';
import '@promises/sleep/add';
```
**Browser**
```html
<script src="https://unpkg.com/@promises/-all/bundle.umd.min.js"><script>
```
```typescript
let { Promises } = P;
```
**Example**
```typescript
import { Promises } from '@promises/-all';
let array: number[] = [1, 2, 3];
let promises: Promises<number[]> = Promises.resolve(array);
let filter: Promises<number[]> = promises.filterParallel((value: number) => value % 2 !== 0);
let map: Promises<number[]> = filter.mapParallel((value: number, index: number) => value + index);
let sleep: Promises<number[]> = map.sleep(1000);
sleep.then((result: number[]) => {
    console.log(result) // => [1, 4]
});
```

## Behavior

```typescript
import timeout from '@promises/timeout';

function run(forEach: Function) {
    let array: number[] = [3, 7, 1, 5];

    console.log('before');
    forEach(array, (value: number) => {
        console.log(`start: ${value}`);
        return timeout((resolve) => {
            console.log(`end: ${value}`);
            resolve();
        }, value);
    }).then(() => {
        console.log('complete');
    });
    console.log('after');
}
```
**Parallel**
```typescript
import forEachParallel from '@promises/for-each-parallel';

run(forEachParallel);

// => before
// => after
// => start 3
// => start 7
// => start 1
// => start 5
// => end 1
// => end 3
// => end 5
// => end 7
// => complete
```
**Series**
```typescript
import forEachSeries from '@promises/for-each-series';

run(forEachSeries);

// => before
// => after
// => start 3
// => end 3
// => start 7
// => end 7
// => start 1
// => end 1
// => start 5
// => end 5
// => complete
```
**Wrap**
```typescript
import forEach from '@pakal/for-each';
import wrap from '@promises/wrap';

let forEachWrap = wrap(forEach);

run(forEachWrap);

// => before
// => after
// => start 3
// => start 7
// => start 1
// => start 5
// => complete    
// => end 1
// => end 3
// => end 5
// => end 7
```

## Compatibility
These modules are written in typescript and available in ES5 and ES6 standard, the requirements are a global __Promise__ (native or polyfill).

* main - commonjs module and es5 standard (index.js)
* es2015 - commonjs module and es2015 standard (index.es6.js)
* browser - bundle in umd format includes all scope dependencies in es5 standard (bundle.umd.js, bundle.umd.min.js)
* typings - typescript declaration file (index.d.ts)

## License
Copyright © 2017 [Yisrael Eliav](https://github.com/yisraelx),
Licensed under the [MIT license](https://github.com/yisraelx/promises/blob/master/LICENSE).
