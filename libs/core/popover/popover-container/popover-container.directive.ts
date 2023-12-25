import { DestroyRef, Directive, ElementRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { resizeObservable } from '@fundamental-ngx/cdk/utils';
import { Subject } from 'rxjs';

@Directive({
    selector: '[fdPopoverContainer]',
    standalone: true
})
export class PopoverContainerDirective implements OnInit {
    /** Subject which emits when popover position refresh is required. */
    refreshPosition$ = new Subject<void>();

    /** @hidden */
    private readonly _destroy$ = inject(DestroyRef);

    /** @hidden */
    constructor(private _elmRef: ElementRef<HTMLElement>) {}

    /** @hidden */
    ngOnInit(): void {
        resizeObservable(this._elmRef.nativeElement)
            .pipe(takeUntilDestroyed(this._destroy$))
            .subscribe(() => {
                this.refreshPosition$.next();
            });
    }
}
