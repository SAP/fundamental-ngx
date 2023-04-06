import { ChangeDetectorRef, inject, Injectable } from '@angular/core';
import { takeUntil } from 'rxjs';
import { CvaDirective } from './cva.directive';
import { DestroyedService } from '@fundamental-ngx/cdk/utils';

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
    protected _destroy$ = inject(DestroyedService);

    /** @hidden */
    listenToChanges(): void {
        this.cvaDirective?.markForCheck.pipe(takeUntil(this._destroy$)).subscribe(() => {
            this._changeDetector.detectChanges();
        });

        this.cvaDirective?.detectChanges.pipe(takeUntil(this._destroy$)).subscribe(() => {
            this._changeDetector.detectChanges();
        });
    }
}
