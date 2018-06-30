/**
 * @module @promises/retry
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import exec from '@promises/exec';
import _timer from '@promises/timer';
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
 * @function
 * @example
 *
 *  let count: number = 0;
 *
 *  let promise: Promise<string> = retry<string>(()=>{
 *      if(count++ < 2)  throw 'error';
 *      return 'foo';
 *  }, {times: 3});
 *
 *  promises.then((result: string) => {
 *      console.log(result); // => 'foo'
 *  });
 */
function retry<R>(fn: () => IOptionalPromise<R>, options?: IRetryOptions): Promise<R> {
    return new Promise<R>((resolve, reject) => {
        let {times = Infinity, interval, timer, filter = (error) => true} = options || {} as any;
        let counter: number = 0;
        let lastTimer: number, lastInterval: number;

        let next = () => {
            counter++;
            let step: Promise<any> = exec(fn);

            if (timer != null) {
                try {
                    lastTimer = typeof timer === 'function' ? timer({counter, last: lastTimer, times}) : timer;
                } catch (error) {
                    return reject(error);
                }
                step = _timer(step, lastTimer);
            }

            step.then(resolve, (error: any) => {
                if ((times === counter) || !filter({error, times, counter})) {
                    throw error;
                }

                lastInterval = typeof interval === 'function' ? interval({counter, last: lastInterval, times}) : interval;
                setTimeout(next, lastInterval);
            }).catch(reject);
        };

        next();
    });
}

export default retry;
