/**
 * @module @promises/-all
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

export { default as compose } from '@promises/compose/add';
export { default as Promises } from '@promises/core';
export { default as create } from '@promises/create/add';
export { default as delay } from '@promises/delay/add';
export { default as doWhileParallel } from '@promises/do-while-parallel/add';
export { default as doWhileSeries } from '@promises/do-while-series/add';
export { default as error } from '@promises/error/add';
export { default as everyParallel } from '@promises/every-parallel/add';
export { default as everySeries } from '@promises/every-series/add';
export { default as exec } from '@promises/exec/add';
export { default as filterParallel } from '@promises/filter-parallel/add';
export { default as filterSeries } from '@promises/filter-series/add';
export { default as finally } from '@promises/finally/add';
export { default as forEachParallel } from '@promises/for-each-parallel/add';
export { default as forEachRightSeries } from '@promises/for-each-right-series/add';
export { default as forEachSeries } from '@promises/for-each-series/add';
export { default as forever } from '@promises/forever/add';
export { default as fromCallback } from '@promises/from-callback/add';
export { default as fromEvent, IFromEventOptions, IEmitterLike } from '@promises/from-event/add';
export * from '@promises/interfaces';
export { default as isPromise } from '@promises/is-promise/add';
export { default as keys } from '@promises/keys/add';
export { default as mapParallel } from '@promises/map-parallel/add';
export { default as mapSeries } from '@promises/map-series/add';
export { default as next } from '@promises/next/add';
export { default as parallel } from '@promises/parallel/add';
export { default as promisify, IPromisifyOptions } from '@promises/promisify/add';
export { default as reduceRightSeries } from '@promises/reduce-right-series/add';
export { default as reduceSeries } from '@promises/reduce-series/add';
export { default as rejectParallel } from '@promises/reject-parallel/add';
export { default as rejectSeries } from '@promises/reject-series/add';
export { default as reset } from '@promises/reset/add';
export { default as retry, IRetryFilterInfo, IRetryOptions, IRetryTimeInfo} from '@promises/retry/add';
export { default as series } from '@promises/series/add';
export { default as sleep } from '@promises/sleep/add';
export { default as someParallel } from '@promises/some-parallel/add';
export { default as someSeries } from '@promises/some-series/add';
export { default as spread } from '@promises/spread/add';
export { default as timeout } from '@promises/timeout/add';
export { default as timer } from '@promises/timer/add';
export { default as timesParallel } from '@promises/times-parallel/add';
export { default as timesSeries } from '@promises/times-series/add';
export { default as toCallback } from '@promises/to-callback/add';
export { default as whileParallel } from '@promises/while-parallel/add';
export { default as wrap } from '@promises/wrap/add';
