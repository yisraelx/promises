import Promises from '@promises/core';
import timeout from '@promises/timeout';

describe('timeout', () => {

    it('should be resolve after timeout', () => {
        let promise: any = timeout((resolve, reject) => {
            resolve('foo');
        }, 1);

        return promise.then((result: string) => {
            expect(result).toBe('foo');
        });
    });

    it('should be reject after timeout', () => {
        let promise: any = timeout((resolve, reject) => {
            reject('error');
        }, 1);

        return promise.catch((error: string) => {
            expect(error).toBe('error');
        });
    });

});
