/**
 * @module @promises/from-event
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

export type IEmitterLike = { addEventListener, removeEventListener } | { addListener, removeListener } | { on, off };

export interface IFromEventOptions {
    multi?: boolean;
    reject?: boolean;
}

/**
 * @example
 *
 * ```typescript
 * let emitter: EventEmitter = new EventEmitter()
 * Promise.race([
 *  fromEvent(emitter, 'foo'),
 *  fromEvent(emitter, 'error', {reject: true})
 * ]).catch((error: string) => {
 *  console.log(error); // error => 'some error'
 * });
 *
 * emitter.emit('error', 'some error');
 * ```
 */
function fromEvent<R>(emitter: IEmitterLike, event: string, options: IFromEventOptions = {}): Promise<R> {
    let {multi = false, reject: rejection = false} = options;

    let add = (emitter as any).addEventListener || (emitter as any).addListener || (emitter as any).on;
    let remove = (emitter as any).removeEventListener || (emitter as any).removeListener || (emitter as any).off;

    return new Promise((resolve, reject) => {
        add.call(emitter, event, function handler(...args: any[])  {
            remove.call(emitter, event, handler);
            let data: R = multi ? args : args[0];
            rejection ? reject(data) : resolve(data);
        });
    });
}

export default fromEvent;
