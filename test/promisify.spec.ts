import Promises from '@promises/core';
import promisify from '@promises/promisify';

function upper(str: string, cb?: (err: any, result: string) => void): void;
function upper(str: string, first: boolean, cb?: (err: any, result: string) => void): void;
function upper(...args) {
    let [str, first, cb] = args;
    if (typeof first === 'function') {
        cb = first;
        first = true;
    }
    if (typeof str !== 'string' || typeof cb !== 'function') throw 'invalid';
    if (str === '') return cb('empty');
    if (first) {
        str = str[0].toUpperCase() + str.slice(1);
    } else {
        str = str.toUpperCase();
    }
    cb(null, str);
}
let upperWrap = promisify(upper);

describe('promisify', () => {
    it('should be bind the result from callback to then (with 2 args)', () => {
        let str = Promises.resolve('foo');
        let first = Promises.resolve(false);
        return (upperWrap as any)(str, first).then((result) => {
            expect(result).toBe('FOO');
        });
    });

    it('should be bind the result from callback to then (with 1 arg)', () => {
        return upperWrap('foo').then((result) => {
            expect(result).toBe('Foo');
        });
    });

    it('should be bind throw error from wrap function to catch', () => {
        return upperWrap(12 as any).catch((error) => {
            expect(error).toBe('invalid');
        });
    });

    it('should be bind the error from callback to catch', () => {
        return upperWrap('').catch((error) => {
            expect(error).toBe('empty');
        });
    });

    it('should be bind multi args from callback to then as array', () => {
        let array = [0, 1, 2];
        let {length} = array;
        let fn = (length, cb) => {
            cb(null, ...array);
        };
        let fnWrap = promisify(fn, {multi: true});
        return fnWrap(length).then((args: number[]) => {
            expect(args.length).toBe(length);
            expect(args[length - 1]).toBe(array[length - 1]);
        });
    });
});
