import Promises from '@promises/core';
import fromEvent, { IEmitterLike, IFromEventOptions } from './';

Promises._setOnConstructor('fromEvent', fromEvent);

export {IEmitterLike, IFromEventOptions} from './';
export default fromEvent;

declare module '@promises/core' {
    namespace Promises {
        /**
         * @example
         *
         * ```typescript
         * let emitter: EventEmitter = new EventEmitter()
         * Promises.fromEvent(emitter, 'foo').then((data: string) => {
         *  console.log(data); // data => 'bar'
         * });
         *
         * emitter.emit('foo', 'bar');
         * ```
         */
        export function fromEvent<R>(emitter: IEmitterLike, event: string, options?: IFromEventOptions): Promises<R>;
    }
}
