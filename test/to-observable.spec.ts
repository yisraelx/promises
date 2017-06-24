import Promises from '@promises/core';
import toObservable from '@promises/to-observable';
import { Observable } from 'rxjs/Observable';

describe('toObservable', () => {
    it('should be resolve to Observable', () => {
        let promise: any = Promises.resolve('foo');
        let observable: Observable<string> = toObservable<string>(promise);
        observable.subscribe((result: string) => {
            expect(result).toBe('foo');
        });
    });

    it('should be reject to Observable', () => {
        let promise: any = Promises.reject('error');
        let observable = toObservable(promise);
        observable.subscribe({
            error(error) {
                expect(error).toBe('error');
            }
        });
    });
});