/**
 * @module @promises/-prototype
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

export { default as Promises } from '@promises/core';
export { default as error } from '@promises/error/add';
export { default as everyParallel } from '@promises/every-parallel/add';
export { default as everySeries } from '@promises/every-series/add';
export { default as filterParallel } from '@promises/filter-parallel/add';
export { default as filterSeries } from '@promises/filter-series/add';
export { default as finally } from '@promises/finally/add';
export { default as forEachParallel } from '@promises/for-each-parallel/add';
export { default as forEachRightSeries } from '@promises/for-each-right-series/add';
export { default as forEachSeries } from '@promises/for-each-series/add';
export * from '@promises/interfaces';
export { default as keys } from '@promises/keys/add';
export { default as mapParallel } from '@promises/map-parallel/add';
export { default as mapSeries } from '@promises/map-series/add';
export { default as next } from '@promises/next/add';
export { default as reduceRightSeries } from '@promises/reduce-right-series/add';
export { default as reduceSeries } from '@promises/reduce-series/add';
export { default as rejectParallel } from '@promises/reject-parallel/add';
export { default as rejectSeries } from '@promises/reject-series/add';
export { default as reset } from '@promises/reset/add';
export { default as sleep } from '@promises/sleep/add';
export { default as someParallel } from '@promises/some-parallel/add';
export { default as someSeries } from '@promises/some-series/add';
export { default as spread } from '@promises/spread/add';
export { default as timer } from '@promises/timer/add';
export { default as toCallback } from '@promises/to-callback/add';
