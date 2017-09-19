import Promises from '@promises/core';
import timer from '@promises/timer';

describe('timer', () => {
    it('should be resolve on no timeout', () => {
        let promise = new Promises((resolve, reject) => {
            setTimeout(() => resolve('foo'), 2);
        });

        return timer(promise, 10, 'timeout').then((result) => {
            expect(result).toBe('foo');
        });
    });

    it('should be reject on timeout', () => {
        let promise = new Promises((resolve, reject) => {
            setTimeout(() => resolve('foo'), 10);
        });

        return timer(promise, 5, 'timeout').catch((error) => {
            expect(error).toBe('timeout');
        });
    });

    it('should be reject on timeout', () => {
        let promise: Promises<string> = new Promises((resolve, reject) => {
            setTimeout(() => resolve('a'), 5);
        });
        let promise2: Promises<string> = new Promises((resolve, reject) => {
            setTimeout(() => resolve('b'), 5);
        });
        let promises: Promises<string[]> = Promises.all<string>([promise, promise2]) as Promises<string[]>;
        return timer(promises, 10, 'timeout').catch((error) => {
            expect(error).toBe('timeout');
        });
    });
});