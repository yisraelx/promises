import series from '@promises/series';
import timeout from '@promises/timeout';

describe(`series`, () => {
    it(`should be exec functions array in series and return array of the result`, () => {
        let foo = () => 'bar';
        let color = () => Promise.resolve('red');
        let functions = [foo, color];
        return series(functions).then((result: string[]) => {
            expect(result).toEqual(['bar', 'red']);
        });
    });

    it(`should be exec functions object in series and return object of the result`, () => {
        let foo = () => 'bar';
        let color = () => Promise.resolve('red');
        let functions = { foo, color };
        return series(functions).then((result: { [key: string]: string }) => {
            expect(result).toEqual({ foo: 'bar', color: 'red' });
        });
    });

    it('should be exec functions array in series and return array of the result', () => {
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
        return series(functions).then((result) => {
            expect(runTime).toEqual(['zero', 'one', 'two']);
            expect(result).toEqual(['zero', 'one', 'two']);
        });
    });
});
