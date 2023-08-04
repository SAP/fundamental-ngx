import { ChangeDetectorRef, DestroyRef, inject, Injectable } from '@angular/core';
import { CvaDirective } from './cva.directive';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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

    /** @Hidden */
    protected _destroyRef = inject(DestroyRef);

    /** @hidden */
    listenToChanges(): void {
        this.cvaDirective?.markForCheck.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            this._changeDetector.detectChanges();
        });

        this.cvaDirective?.detectChanges.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            this._changeDetector.detectChanges();
        });
    }
}
