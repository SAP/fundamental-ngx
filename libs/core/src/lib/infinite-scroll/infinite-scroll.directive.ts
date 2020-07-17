import { Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';

/**
 * Tool directive used to achieve the infinite scroll mechanism.
 */
@Directive({
    selector: '[fdInfiniteScroll]'
})
export class InfiniteScrollDirective implements OnInit, OnDestroy {
    /** Scroll percentage at which the onScrollAction event is fired. */
    @Input()
    scrollPercent = 75;

    /** Scroll PX at which the onScrollAction event is fired. */
    @Input()
    scrollOffset: number = null;

    /** Event emitted when the scrollPercent threshold is met. */
    @Output()
    onScrollAction = new EventEmitter<void>();

    /** @hidden */
    private _subscription = new Subscription();

    /** @hidden */
    constructor(private _element: ElementRef) {}

    /** @hidden */
    ngOnInit(): void {
        this._setUpSubscription();
    }

    /** @hidden */
    ngOnDestroy(): void {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
    }

    /** @hidden **/
    private _shouldTriggerAction(): boolean {
        const element = this._element.nativeElement;
        const offset: number = element.scrollTop + element.offsetHeight;
        if (this.scrollOffset) {
            return offset > (element.scrollHeight - this.scrollOffset);
        } else {
            return (offset / element.scrollHeight) > this.scrollPercent / 100
        }
    }

    /** @hidden */
    private _setUpSubscription(): void {
        this._subscription.add(
            fromEvent(this._element.nativeElement, 'scroll')
                .subscribe(() => {
                    if (this._shouldTriggerAction()) {
                        this.onScrollAction.emit(null);
                    }
                })
        );
    }
}
