/**
 * @module @promises/-constructor
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

export {default as compose} from '@promises/compose/add';
export {default as Promises} from '@promises/core';
export {default as create} from '@promises/create/add';
export {default as delay} from '@promises/delay/add';
export {default as exec} from '@promises/exec/add';
export {default as forever} from '@promises/forever/add';
export {default as fromCallback} from '@promises/from-callback/add';
export {default as fromEvent, IFromEventOptions, IEmitterLike} from '@promises/from-event/add';
export * from '@promises/interfaces';
export {default as isPromise} from '@promises/is-promise/add';
export {default as promisify, IPromisifyOptions} from '@promises/promisify/add';
export {default as parallel} from '@promises/parallel/add';
export {default as retry, IRetryFilterInfo, IRetryOptions, IRetryTimeInfo} from '@promises/retry/add';
export {default as series} from '@promises/series/add';
export {default as timeout} from '@promises/timeout/add';
export {default as timesParallel} from '@promises/times-parallel/add';
export {default as timesSeries} from '@promises/times-series/add';
export {default as wrap} from '@promises/wrap/add';
