import { of } from 'rxjs';
import { isPromise, isSubscribable } from '../typecheck';
import { MakeAsyncPipe } from './make-async.pipe';

describe('MakeAsyncPipe', () => {
    it('create an instance', () => {
        const pipe = new MakeAsyncPipe();
        expect(pipe).toBeTruthy();
    });

    it('should transform static value', () => {
        const pipe = new MakeAsyncPipe();

        const observableFromStatic = pipe.transform('string');
        const promiseNotModified = pipe.transform(
            new Promise((resolve) => {
                resolve('string');
            })
        );
        const observableNotModified = pipe.transform(of('string'));

        expect(isSubscribable(observableFromStatic)).toBeTrue();
        expect(isPromise(promiseNotModified)).toBeTrue();
        expect(isSubscribable(observableNotModified)).toBeTrue();
    });
});
