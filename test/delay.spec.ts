import Promises from '@promises/core';
import delay from '@promises/delay';

describe('delay', () => {
    it('should be return promise with delay', () => {
        let delayPromise = delay(2);
        let pass = false;
        setTimeout(() => {
            pass = true;
        }, 1);
        return delayPromise.then(() => {
            expect(pass).toBeTruthy();
        });
    });
});