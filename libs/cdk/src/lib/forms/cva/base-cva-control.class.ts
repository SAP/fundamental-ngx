import { ChangeDetectorRef, Directive, inject, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CvaDirective } from './cva.directive';

/**
 * Base ControlValueAccessor control class.
 * Used in conjunction with CvaDirective.
 *
 * This class performs generic change detection based on `CvaDirective` outputs.
 */
@Directive()
export abstract class BaseCvaControl<T> implements OnInit, OnDestroy {
    /**
     * Control value accessor directive instance.
     */
    public cvaDirective = inject(CvaDirective<T>, {
        self: true,
        optional: true
    });

    /**
     * Change detector instance.
     */
    protected _changeDetector = inject(ChangeDetectorRef);

    /** @Hidden */
    protected _destroy$ = new Subject<void>();

    /** @hidden */
    ngOnInit(): void {
        this.cvaDirective?.markForCheck.pipe(takeUntil(this._destroy$)).subscribe(() => {
            this._changeDetector.markForCheck();
        });

        this.cvaDirective?.detectChanges.pipe(takeUntil(this._destroy$)).subscribe(() => {
            this._changeDetector.detectChanges();
        });
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }
}
