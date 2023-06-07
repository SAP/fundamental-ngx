import { of, Subject } from 'rxjs';

export class TableColumnResizeServiceMock {
    /** @hidden */
    resizerPosition = null;

    /** @hidden */
    resizerPosition$ = new Subject<number>();

    /** @hidden */
    resizeInProgress$ = new Subject<boolean>();

    /** @hidden */
    resizeInProgress = false;

    /** @hidden */
    markForCheck = of(null);

    /** @hidden */
    startResize(): void {}

    /** @hidden */
    finishResize(): void {}
}
