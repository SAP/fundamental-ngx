import { of } from 'rxjs';

export class TableColumnResizeServiceMock {
    resizerPosition = null;

    resizeInProgress = false;

    markForCheck = of(null);

    startResize(): void {}

    finishResize(event: any): void {}
}
