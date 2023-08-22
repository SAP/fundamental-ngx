import { Directive, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { resizeObservable } from '@fundamental-ngx/cdk/utils';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
    selector: '[fdPopoverContainer]',
    standalone: true
})
export class PopoverContainerDirective implements OnInit, OnDestroy {
    /** Subject which emits when popover position refresh is required. */
    refreshPosition$ = new Subject<void>();

    /** @hidden */
    private _destroy$ = new Subject<void>();

    /** @hidden */
    constructor(private _elmRef: ElementRef<HTMLElement>) {}

    /** @hidden */
    ngOnInit(): void {
        resizeObservable(this._elmRef.nativeElement)
            .pipe(takeUntil(this._destroy$))
            .subscribe(() => {
                this.refreshPosition$.next();
            });
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }
}
