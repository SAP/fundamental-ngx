import { ChangeDetectorRef } from '@angular/core';
import { isSubscribable } from '../typecheck';
import { of } from 'rxjs';
import { AsyncOrSyncPipe } from './async-or-sync.pipe';

class CdrStub {
    detectChanges(): void {}

    markForCheck(): void {}
}

describe('AsyncOrSyncPipe', () => {
    it('create an instance', () => {
        const pipe = new AsyncOrSyncPipe(new CdrStub() as ChangeDetectorRef);
        expect(pipe).toBeTruthy();
    });

    it('should transform async-like value', () => {
        const pipe = new AsyncOrSyncPipe(new CdrStub() as ChangeDetectorRef);

        const stringFromObservable = pipe.transform(of('string'));
        const stringNotModified = pipe.transform('string');

        expect(isSubscribable(stringFromObservable)).toBeFalse();
        expect(stringFromObservable).toEqual('string');
        expect(stringNotModified).toEqual('string');
    });
});
