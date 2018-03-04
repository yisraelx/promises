# Promises utility modules
[![Travis build](https://travis-ci.org/yisraelx/promises.svg?branch=master)](https://travis-ci.org/yisraelx/promises)
[![Codecov](https://codecov.io/gh/yisraelx/promises/branch/master/graph/badge.svg)](https://codecov.io/gh/yisraelx/promises)
[![MIT License](https://img.shields.io/npm/l/@promises/core.svg)](https://github.com/yisraelx/promises/blob/master/LICENSE)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

## Packages structure
##### The code is divided into many small modules and each module is a package in itself ([Packages List](https://github.com/yisraelx/promises/blob/master/PACKAGES.md)).
##### Each package in the scoop has only one function or class and it in the default export of the package.
##### Group package brings together several modules from the scope, and in the export has access to all modules.

#### Marks
* "**-**": __@{scope}/-{name}__ - Group package
* "**_**": **@{scope}/_{name}** - Internal package

#### Import
import __forEachSeries__ _default_ function from '@promises/for-each-series' package, which is package from scoop __@promises__ that contains only one function
```typescript
import forEachSeries from '@promises/for-each-series'; 
```
import __forEachSeries__ function from '@promises/-all' package, which is group package that contains all functions from scoop __@promises__
```typescript
import { forEachSeries } from '@promises/-all';  
```
import __Promises__ class from '@promises/-all' package, which is group package that contains all functions from scoop __@promises__, This will add to the Promises.* and Promises.prototype.*  all the functions of the packages in the scope __@promises__ 
```typescript
import { Promises } from '@promises/-all'; 
```
Or
```typescript
import '@promises/-all';
import Promises from '@promises/core';
```
Or import some groups of modules from scope __@promises__, This will add the functions of the modules to Promises.* and Promises.prototype.*
```typescript
import '@promises/-rxjs';
import '@promises/-parallel';
import Promises from '@promises/core';
```

## Install
__Installation of all packages in scoop @promises__
```sh
$ npm install --save @promises/-all
```
__Installation of a single package from scoop @promises__
```sh
$ npm install --save @promises/for-each-series
```

## Use
#### static
```ts
import mapSeries from '@promises/map-series';
let array: number[] = [1, 2, 3];
let map: Promise<number[]> = mapSeries(array, (value: number, index: number, array: number[]) => {
    return value * index;
});
map.then((result: number[]) => {
    console.log(result) // => [0, 2, 6]
});
```
#### wrapper
```ts
import { Promises } from '@promises/-all';
let array: number[] = [1, 2, 3];
let promises: Promises<number[]> = Promises.resolve(array);
let filter: Promises<number[]> = promises.filterParallel((value: number) => value % 2 !== 0);
let map: Promises<number[]> = filter.mapParallel((value: number, index: number) => value + index);
let delay: Promises<number[]> = map.delay(1000);
delay.then((result: number[]) => {
    console.log(result) // => [1, 4]
});
```
Or
```ts
import Promises from '@promises/core';
import '@promises/filter-parallel/add';
import '@promises/map-parallel/add';
import '@promises/delay/add';

let array: number[] = [1, 2, 3];
let promises: Promises<number[]> = Promises.resolve(array);
let filter: Promises<number[]> = promises.filterParallel((value: number) => value % 2 !== 0);
let map: Promises<number[]> = filter.mapParallel((value: number, index: number) => value + index);
let delay: Promises<number[]> = map.delay(1000);
delay.then((result: number[]) => {
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
#### Parallel
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
#### Series
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
#### Wrap 
```typescript
import { forEach } from 'lodash';
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
- main - commonjs module and es5 standard (es5.js)
- es2015/module - commonjs module and es6 standard (index.js)
- browser - umd format and es5 standard (umd.js, umd.min.js)
- bundle - bundle in umd format includes all scope dependencies in es5 standard (bundle.js, bundle.min.js)
- typings - typescript declaration file (index.d.ts)

## License
Copyright © 2017 [Yisrael Eliav](https://github.com/yisraelx),
Licensed under the [MIT license](https://github.com/yisraelx/promises/blob/master/LICENSE).
