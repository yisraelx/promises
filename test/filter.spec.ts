import Promises from '@promises/core';
import filterSeries from '@promises/filter-series';
import filterParallel from '@promises/filter-parallel';
import rejectSeries from '@promises/reject-series';
import rejectParallel from '@promises/reject-parallel';
import { IFn, ITestIteratee } from './interfaces';

export interface ITestFilter extends ITestIteratee {
    filter?: any;
    reject?: any;
}

export let tests: ITestFilter[] = [
    {collection: void 0, filter: [], reject: []},
    {collection: [], filter: [], reject: []},
    {collection: [false], filter: [], reject: [false]},
    {collection: [true], filter: [true], reject: []},
    {collection: [true, false], filter: [true], reject: [false]},
    {collection: {}, filter: {}, reject: {}},
    {collection: {0: 0}, filter: {}, reject: {0: 0}},
    {collection: {1: 1}, filter: {1: 1}, reject: {}},
    {collection: {1: 1, 0: 0}, filter: {1: 1}, reject: {0: 0}},
    {collection: [true], iteratee: () => false, filter: [], reject: [true]},
    {collection: [false], iteratee: () => true, filter: [false], reject: []},
    {collection: [false], iteratee: () => Promises.resolve(1), filter: [false], reject: []},
    {
        collection: Promises.resolve([Promises.resolve(1), Promises.resolve(0)]),
        iteratee: (val) => val,
        filter: [1],
        reject: [0]
    }
];

export let fns: IFn[] = [
    {id: 'filterSeries', type: 'filter', fn: filterSeries},
    {id: 'filterParallel', type: 'filter', fn: filterParallel},
    {id: 'rejectSeries', type: 'reject', fn: rejectSeries},
    {id: 'rejectParallel', type: 'reject', fn: rejectParallel}
];

export function createTest(fns: IFn[], tests: ITestFilter[]) {
    fns.forEach(({id, fn, type}: IFn) => {
        describe(`${id}`, () => {
            tests.forEach(({collection, iteratee, filter, reject}: ITestFilter) => {
                let equal = type === 'filter' ? filter : reject;
                it(`should be return promise with ${JSON.stringify(equal)} for ${JSON.stringify(collection)} and iteratee ${JSON.stringify(iteratee)}`, () => {
                    return fn(collection, iteratee).then((result) => {
                        expect(result).toEqual(equal);
                    });
                });
            });
        });
    });
}

createTest(fns, tests);
