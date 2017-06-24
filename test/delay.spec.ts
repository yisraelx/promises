import Promises from '@promises/core';
import delay from '@promises/delay';

describe('delay', () => {

    it('should be resolve after delay', () => {
        let promise: any = Promises.resolve('foo');
        let delayPromises = delay(promise, 1);

        return delayPromises.then((result: string) => {
            expect(result).toBe('foo');
        });
    });

    it('should be reject after delay', () => {
        let promise: any = Promises.reject('error');
        let delayPromises = delay(promise, 1);

        return delayPromises.catch((error: string) => {
            expect(error).toBe('error');
        });
    });

});