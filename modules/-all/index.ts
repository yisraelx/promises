/**
 * @module @promises/-all
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

export { default as compose } from '@promises/compose';
export { default as create } from '@promises/create';
export { default as delay } from '@promises/delay';
export { default as doWhileParallel } from '@promises/do-while-parallel';
export { default as doWhileSeries } from '@promises/do-while-series';
export { default as error } from '@promises/error';
export { default as everyParallel } from '@promises/every-parallel';
export { default as everySeries } from '@promises/every-series';
export { default as exec } from '@promises/exec';
export { default as filterParallel } from '@promises/filter-parallel';
export { default as filterSeries } from '@promises/filter-series';
export { default as finally } from '@promises/finally';
export { default as forEachParallel } from '@promises/for-each-parallel';
export { default as forEachRightSeries } from '@promises/for-each-right-series';
export { default as forEachSeries } from '@promises/for-each-series';
export { default as forever } from '@promises/forever';
export { default as fromCallback } from '@promises/from-callback';
export { default as fromEvent } from '@promises/from-event';
export * from '@promises/interfaces';
export { default as isPromise } from '@promises/is-promise';
export { default as keys } from '@promises/keys';
export { default as mapParallel } from '@promises/map-parallel';
export { default as mapSeries } from '@promises/map-series';
export { default as next } from '@promises/next';
export { default as parallel } from '@promises/parallel';
export { default as promisify } from '@promises/promisify';
export { default as reduceRightSeries } from '@promises/reduce-right-series';
export { default as reduceSeries } from '@promises/reduce-series';
export { default as rejectParallel } from '@promises/reject-parallel';
export { default as rejectSeries } from '@promises/reject-series';
export { default as reset } from '@promises/reset';
export { default as retry } from '@promises/retry';
export { default as series } from '@promises/series';
export { default as sleep } from '@promises/sleep';
export { default as someParallel } from '@promises/some-parallel';
export { default as someSeries } from '@promises/some-series';
export { default as spread } from '@promises/spread';
export { default as timeout } from '@promises/timeout';
export { default as timer } from '@promises/timer';
export { default as timesParallel } from '@promises/times-parallel';
export { default as timesSeries } from '@promises/times-series';
export { default as toCallback } from '@promises/to-callback';
export { default as wait } from '@promises/wait';
export { default as whileParallel } from '@promises/while-parallel';
export { default as whileSeries } from '@promises/while-series';
export { default as wrap } from '@promises/wrap';

import './add';
export { default as Promises } from '@promises/core';
