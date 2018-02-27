import Promises from '@promises/core';
import sleep from '@promises/sleep';
import delay from '@promises/delay';

describe('sleep', () => {

    it('should be pass the value after sleep', () => {
        let promise: Promises<string> = Promises.resolve('foo');
        let sleepPromises = sleep(promise, 1);

        return sleepPromises.then((result: string) => {
            expect(result).toBe('foo');
        });
    });

    it('should be promise reject not sleep', () => {
        let pass = false;
        let promise = Promises.reject('error');

        sleep(promise, 5).catch(() => {
            pass = true;
        });

        return delay(1).then(() => {
            expect(pass).toBeTruthy();
        });
    });
});
