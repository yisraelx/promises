import Promises from '@promises/core';
import sleep from '../';

Promises._setOnPrototype('sleep', sleep);

export default Promises;

declare module '@promises/core' {
    interface Promises<T> {
        /**
         * @example
         *
         *  let promises: Promises<string> = Promises.resolve<string>('foo');
         *  promises.sleep(3000).then((result: string) => {
         *    console.log(result); // result => 'foo'
         *  });
         */
        sleep(ms?: number): Promises<T>;
    }
}
