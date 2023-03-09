import { AsyncOrSyncPipe } from './async-or-sync.pipe';

describe('AsyncOrSyncPipe', () => {
    it('create an instance', () => {
        const pipe = new AsyncOrSyncPipe();
        expect(pipe).toBeTruthy();
    });
});
