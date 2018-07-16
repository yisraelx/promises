import fromObservable from '@promises/from-observable';
import { Observable, Subscriber } from 'rxjs';

describe('fromObservable', () => {

    it('should be resolve from Observable', () => {
        let observable: Observable<string> = new Observable<string>((subscriber: Subscriber<string>) => {
            subscriber.next('foo');
            subscriber.complete();
        });
        return fromObservable(observable).then((result: string) => {
            expect(result).toBe('foo');
        });
    });

    it('should be reject from Observable', () => {
        let observable: Observable<string> = new Observable<string>((subscriber: Subscriber<string>) => {
            subscriber.error('error');
        });
        return fromObservable(observable).catch((error: string) => {
            expect(error).toBe('error');
        });
    });
});
