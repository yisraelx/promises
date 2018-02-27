import sleep from '@promises/sleep';
import delay from '@promises/delay';

describe('sleep', () => {

    it('should be pass the value after sleep', () => {
        let promise: Promise<string> = Promise.resolve('foo');
        let sleepPromise = sleep(promise, 1);

        return sleepPromise.then((result: string) => {
            expect(result).toBe('foo');
        });
    });

    it('should be promise reject not sleep', () => {
        let pass = false;
        let promise = Promise.reject('error');

        sleep(promise, 5).catch(() => {
            pass = true;
        });

        return delay(1).then(() => {
            expect(pass).toBeTruthy();
        });
    });
});
