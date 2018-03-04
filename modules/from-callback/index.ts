/**
 * @module @promises/from-callback
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

/**
 * @example
 *
 * ```typescript
 *  fromCallback<string[]>((callback) => {
 *      fs.readdir(process.cwd(), callback);
 *  }).then((result: string[]) => {
 *      console.log(result);
 *  });
 * ```
 */
function fromCallback<R>(fn: (callback: (error?: any, ...result: R[keyof R & number][]) => void) => void, multi: true): Promise<R>;
function fromCallback<R>(fn: (callback: (error?: any, result?: R) => void) => void, multi?: false): Promise<R>;
function fromCallback<R>(fn, multi?: boolean): Promise<R> {
    return new Promise<R>((resolve, reject) => {
        fn((error: any, ...result: any[]) => {
            error ? reject(error) : resolve(multi ? result : result[0]);
        });
    });
}

export default fromCallback;
