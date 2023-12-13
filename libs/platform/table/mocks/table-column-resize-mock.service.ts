import { of, Subject } from 'rxjs';

export class TableColumnResizeServiceMock {
    /** @ignore */
    resizerPosition = null;

    /** @ignore */
    resizerPosition$ = new Subject<number>();

    /** @ignore */
    resizeInProgress$ = new Subject<boolean>();

    /** @ignore */
    resizeInProgress = false;

    /** @ignore */
    markForCheck = of(null);

    /** @ignore */
    startResize(): void {}

    /** @ignore */
    finishResize(): void {}
}
