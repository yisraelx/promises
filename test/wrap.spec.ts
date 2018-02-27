import Promises from '@promises/core';
import wrap from '@promises/wrap';

describe('wrap', () => {

    it('should be warp function and return promise whit function return boolan val', () => {
        let pass = (is: any) => !!is;
        let passWrap = wrap(pass);
        return passWrap('foo').then((result) => {
            expect(result).toBeTruthy();
        });
    });

    it('should be warp never function and return promise whit error', () => {
        let throwError = function (): never {
            throw 'error';
        };
        let throwErrorWrap: () => Promises<any> = wrap(throwError);
        return throwErrorWrap().catch((error) => {
            expect(error).toBe('error');
        });
    });

    it('should be warp function and resolve args and return promise whit function return val', () => {
        let plus = (a, b) => a + b;
        let plusWrap = wrap(plus);
        let a = Promises.resolve(1);
        let b = Promises.resolve(2);
        return plusWrap(a, b).then((result) => {
            expect(result).toBe(3);
        });
    });

});
