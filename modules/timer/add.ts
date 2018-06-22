import Promises from '@promises/core';
import timer from './';

Promises._setOnPrototype('timer', timer);

declare module '@promises/core' {
    interface Promises<T> {
        /**
         * @example
         *
         * ```typescript
         *  let promises: Promises<string> = Promises.resolve<string>('foo').delay(3000);
         *
         *  promises.timer(1500, 'error: timeout').catch((error: string) => {
         *      console.log(error); // error => 'error: timeout'
         *  });
         * ```
         */
        timer(ms?: number, error?: any): Promises<T>;
    }
}
