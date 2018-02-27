import Promises from '@promises/core';
import everySeries from '@promises/every-series';
import everyParallel from '@promises/every-parallel';
import someSeries from '@promises/some-series';
import someParallel from '@promises/some-parallel';

import { IFn, ITestIteratee } from './interfaces';

export interface ITestChecksIteratee extends ITestIteratee {
    every?: boolean;
    some?: boolean;
}

let tests: ITestChecksIteratee[] = [
    { collection: void 0, every: true, some: false },
    { collection: [], every: true, some: false },
    { collection: {}, every: true, some: false },
    { collection: Promises.resolve(void 0), every: true, some: false },
    { collection: Promises.resolve([]), every: true, some: false },
    { collection: Promises.resolve({}), every: true, some: false },
    { collection: [null], every: false, some: false },
    { collection: [false], every: false, some: false },
    { collection: [void 0], every: false, some: false },
    { collection: [0], every: false, some: false },
    { collection: { 0: 0 }, every: false, some: false },
    { collection: ['yes'], every: true, some: true },
    { collection: [1], every: true, some: true },
    { collection: { 1: 1 }, every: true, some: true },
    { collection: { 1: 1, 0: 0 }, every: false, some: true },
    { collection: [true], every: true, some: true },
    { collection: [true, false], every: false, some: true },
    { collection: [false], iteratee: () => Promises.reject('error'), every: 'error' as any, some: 'error' as any },
    { collection: [false], iteratee: () => true, every: true, some: true },
    { collection: [true], iteratee: () => false, every: false, some: false },
    { collection: [true], iteratee: () => Promises.resolve(0), every: false, some: false },
    {
        collection: Promises.resolve([Promises.resolve(1), Promises.resolve(0)]),
        iteratee: void 0,
        every: false,
        some: true
    }
];

let fns: IFn[] = [
    { id: 'everySeries', fn: everySeries, type: 'every' },
    { id: 'everyParallel', fn: everyParallel, type: 'every' },
    { id: 'someSeries', fn: someSeries, type: 'some' },
    { id: 'someParallel', fn: someParallel, type: 'some' }
];

export function  createTest(fns: IFn[], tests: ITestChecksIteratee[]) {
    fns.forEach(({id, fn, type}: IFn) => {
        describe(`${id}`, () => {
            tests.forEach(({collection, iteratee, every, some}: ITestChecksIteratee) => {
                let equal = type === 'every' ? every : some;
                it(`should be return promise with ${JSON.stringify(equal)} for ${JSON.stringify(collection)} and iteratee ${JSON.stringify(iteratee)}`, () => {
                    return fn(collection, iteratee).then((result) => {
                        expect(result).toBe(equal);
                    }).catch((error) => {
                        expect(error).toBe(equal);
                    });
                });
            });
        });
    });
}

createTest(fns, tests);
