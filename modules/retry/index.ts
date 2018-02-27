/**
 * @module @promises/retry
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import Promises from '@promises/core';
import exec from '@promises/exec';
import timeout from '@promises/timeout';
import '@promises/timer';
import { IOptionalPromise } from '@promises/interfaces';

export interface IRetryOptions {
    times?: number;
    interval?: number | ((info: IRetryTimeInfo) => number);
    timer?: number | ((info: IRetryTimeInfo) => number);
    filter?: (info: IRetryFilterInfo) => boolean;
}

export interface IRetryTimeInfo {
    counter: number;
    last: number;
    times: number;
}

export interface IRetryFilterInfo {
    counter: number;
    error: any;
    times: number;
}

/**
 * @example
 *
 * ```typescript
 *  let count = 0;
 *  let promises = retry(()=>{
 *  if(count++ < 2)  throw 'error';
 *      return 'foo';
 *  }, {times: 3})
 *
 *  promises.then((result) => {
 *      console.log(result); // => 'foo'
 *  })
 * ```
 */
function retryStatic<R>(fn: () => IOptionalPromise<R>, options?: IRetryOptions): Promises<R> {
    let { times = 1, interval, timer, filter = (error) => true } = options || {} as any;
    return retryHelper(fn, { times, interval, timer, filter, counter: 1 }) as Promises<R>;
}

function retryHelper(fn, options) {
    let { counter, times, timer, interval, filter, lastTimer, lastInterval } = options;
    let step = exec(fn);
    if (timer != null) {
        lastTimer = typeof timer === 'function' ? timer({ counter, last: lastTimer, times }) : timer;
        step = step.timer(lastTimer);
    }

    step = step.catch((error) => {
        if ((times === counter) || !filter({ error, times, counter })) throw error;
        lastInterval = typeof interval === 'function' ? interval({ counter, last: lastInterval, times }) : interval;
        counter++;
        return timeout((resolve) => {
            let result = retryHelper(fn, { counter, times, timer, interval, filter, lastTimer, lastInterval });
            resolve(result);
        }, lastInterval);
    });
    return step;
}

export default retryStatic;

Promises._setOnConstructor('retry', retryStatic);

declare module '@promises/core' {
    namespace Promises {
        /**
         * @example
         *
         * ```typescript
         *  let count = 0;
         *  let promises = Promises.retry(()=>{
         *  if(count++ < 2)  throw 'error';
         *      return 'foo';
         *  }, {times: 3})
         *
         *  promises.then((result) => {
         *      console.log(result); // => 'foo'
         *  })
         * ```
         */
        export let retry: typeof retryStatic;
    }
}
