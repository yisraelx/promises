/**
 * @module @promises/-prototype
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

export { default as Promises } from '@promises/core';
export { default as error } from '@promises/error';
export { default as everyParallel } from '@promises/every-parallel';
export { default as everySeries } from '@promises/every-series';
export { default as filterParallel } from '@promises/filter-parallel';
export { default as filterSeries } from '@promises/filter-series';
export { default as finally } from '@promises/finally';
export { default as forEachParallel } from '@promises/for-each-parallel';
export { default as forEachSeries } from '@promises/for-each-series';
export { default as forEachRightSeries } from '@promises/for-each-right-series';
export { default as keys } from '@promises/keys';
export { default as mapParallel } from '@promises/map-parallel';
export { default as mapSeries } from '@promises/map-series';
export { default as next } from '@promises/next';
export { default as reduceSeries } from '@promises/reduce-series';
export { default as reduceRightSeries } from '@promises/reduce-right-series';
export { default as rejectParallel } from '@promises/reject-parallel';
export { default as rejectSeries } from '@promises/reject-series';
export { default as reset } from '@promises/reset';
export { default as retry, RetryOptions, RetryFilterInfo, RetryTimeInfo } from '@promises/retry';
export { default as sleep } from '@promises/sleep';
export { default as someParallel } from '@promises/some-parallel';
export { default as someSeries } from '@promises/some-series';
export { default as spread } from '@promises/spread';
export { default as timer } from '@promises/timer';
export { default as toCallback } from '@promises/to-callback';
