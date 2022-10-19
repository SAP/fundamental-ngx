import { of } from 'rxjs';

export class TableColumnResizeServiceMock {
    /** @hidden */
    resizerPosition = null;

    /** @hidden */
    resizeInProgress = false;

    /** @hidden */
    markForCheck = of(null);

    /** @hidden */
    startResize(): void {}

    /** @hidden */
    finishResize(): void {}
}
