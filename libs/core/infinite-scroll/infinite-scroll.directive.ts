import { DestroyRef, Directive, ElementRef, inject, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { fromEvent } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';

/**
 * Tool directive used to achieve the infinite scroll mechanism.
 */
@Directive({
    selector: '[fdInfiniteScroll]'
})
export class InfiniteScrollDirective {
    /** Scroll percentage at which the onScrollAction event is fired. */
    readonly scrollPercent = input(75);

    /** Scroll PX at which the onScrollAction event is fired. */
    readonly scrollOffset = input<Nullable<number>>(null);

    /** Event emitted when the scrollPercent threshold is met. */
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    readonly onScrollAction = output<void>();

    /** @hidden */
    private readonly _element = inject(ElementRef);

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    constructor() {
        this._listenOnScroll();
    }

    /** @hidden */
    shouldTriggerAction(): boolean {
        const element = this._element.nativeElement;
        const offset: number = element.scrollTop + element.offsetHeight;
        const scrollOffsetValue = this.scrollOffset();
        if (scrollOffsetValue) {
            return offset > element.scrollHeight - scrollOffsetValue;
        } else {
            return offset / element.scrollHeight > this.scrollPercent() / 100;
        }
    }

    /** @hidden */
    private _listenOnScroll(): void {
        fromEvent(this._element.nativeElement, 'scroll')
            .pipe(
                debounceTime(50),
                filter(() => this.shouldTriggerAction()),
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe(() => this.onScrollAction.emit());
    }
}
