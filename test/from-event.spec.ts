import fromEvent from '@promises/from-event';

class Emitter {

    _events: { [key: string]: Function[] } = {};

    on(event: string, handler) {
        if (!this._events[event]) this._events[event] = [];
        if (this._events[event].indexOf(handler) === -1) this._events[event].push(handler);
    }

    off(event: string, handler) {
        let handlers = this._events[event] || [];
        let index = handlers.indexOf(handler);
        if (index !== -1) handlers.splice(index, 1);
    }

    emit(event: string, ...args: any[]) {
        let handlers = this._events[event] || [];
        let {length} = handlers;
        for (let i = 0; i < length; i++) {
            let handler = handlers[i];
            handler(...args);
        }
    }
}

describe('fromEvent', () => {

    it('should be resolve on emit', () => {
        let emitter = new Emitter();
        fromEvent(emitter, 'foo').then((data) => {
            expect(data).toBe('bar');
        });
        emitter.emit('foo', 'bar');
    });

    it('should be reject on emit', () => {
        let emitter = new Emitter();
        fromEvent(emitter, 'error', {reject: true}).then(() => {
            throw 'resolve';
        }).catch((error) => {
            expect(error).toBe('reject');
        });
        emitter.emit('error', 'reject');
    });

    it('should be resolve multi on emit', () => {
        let emitter = new Emitter();
        fromEvent(emitter, 'color', {multi: true}).then((args) => {
            expect(args).toEqual(['red', 'blue']);
        });
        emitter.emit('color', 'red', 'blue');
    });
});
