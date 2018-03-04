import forever from '@promises/forever';

describe('forever', () => {

    it('should be iteratee 0 times and reject', () => {
        return forever(() => {
            throw 'reject';
        }).then(() => {
            throw 'resolve';
        }).catch((error) => {
            expect(error).toBe('reject');
        });
    });

    it('should be reject after iteratee 5 times', () => {
        return forever((count) => new Promise((resolve, reject) => {
            count >= 5 ? reject(count) : resolve(++count);
        }), 0).then(() => {
            throw 'resolve';
        }).catch((count) => {
            expect(count).toBe(5);
        });
    });
});
