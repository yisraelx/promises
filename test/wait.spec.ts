import wait from '@promises/wait';

describe('wait', () => {
    it('should be resolve after 5 times', () => {
        let promise = Promise.resolve('foo');
        let count = 0;
        return wait(promise, (value) => {
            expect(value).toBe('foo');
            return count++ === 5;
        }).then((value) => {
            expect(value).toBe('foo');
            expect(count).toBe(6);
        });
    });

    it('should be reject if there test error', () => {
        let promise = Promise.resolve('foo');
        return wait(promise, () => {
            throw 'reject';
        }).then(() => {
            throw 'resolve';
        }).catch((error) => {
            expect(error).toBe('reject');
        });
    });
});
