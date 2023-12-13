import { ChangeDetectorRef, DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CvaDirective } from './cva.directive';

/**
 * Base ControlValueAccessor control class.
 * Used in conjunction with CvaDirective.
 *
 * This class performs generic change detection based on `CvaDirective` outputs.
 */
@Injectable()
export class CvaControl<T> {
    /**
     * Control value accessor directive instance.
     */
    public cvaDirective = inject<CvaDirective<T>>(CvaDirective, {
        self: true,
        optional: true
    });

    /**
     * Change detector instance.
     */
    protected _changeDetector = inject(ChangeDetectorRef);

    /** @ignore */
    protected _destroyRef = inject(DestroyRef);

    /** @ignore */
    listenToChanges(): void {
        this.cvaDirective?.markForCheck.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            this._changeDetector.detectChanges();
        });

        this.cvaDirective?.detectChanges.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            this._changeDetector.detectChanges();
        });
    }
}
