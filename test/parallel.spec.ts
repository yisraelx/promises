import Promises from '@promises/core';
import parallel from '@promises/parallel';
import timeout from '@promises/timeout';

describe(`parallel`, () => {
    it(`should be exec functions array in parallel and return array of the result`, () => {
        let foo = () => 'bar';
        let color = () => Promise.resolve('red');
        let functions = [foo, color];
        return parallel(functions).then((result: string[]) => {
            expect(result).toEqual(['bar', 'red']);
        });
    });

    it(`should be exec functions object in parallel and return object of the result`, () => {
        let foo = () => 'bar';
        let color = () => Promise.resolve('red');
        let functions = { foo, color };
        return parallel(functions).then((result: { [key: string]: string }) => {
            expect(result).toEqual({ foo: 'bar', color: 'red' });
        });
    });

    it('should be exec functions array in parallel and return array of the result', () => {
        let runTime = [];
        let fn = (id: string, ms: number) => () => timeout((resolve) => {
            runTime.push(id);
            resolve(id);
        }, ms);
        let functions = [
            fn('zero', 7),
            fn('one', 3),
            fn('two', 5)
        ];
        return parallel(functions).then((result) => {
            expect(runTime).toEqual(['one', 'two', 'zero']);
            expect(result).toEqual(['zero', 'one', 'two']);
        });
    });
});