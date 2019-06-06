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
    scrollPercent: number = 75;

    /** Event emitted when the scrollPercent threshold is met. */
    @Output()
    onScrollAction = new EventEmitter<any>();

    private scrollEvent: Observable<any>;
    private subscription: Subscription;

    /** @hidden */
    constructor(private element: ElementRef) {}

    /** @hidden */
    ngOnInit(): void {
        this.scrollEvent = fromEvent(this.element.nativeElement, 'scroll');

        this.subscription = this.scrollEvent.subscribe((e: any) => {
            if ((e.target.scrollTop + e.target.offsetHeight) / e.target.scrollHeight > this.scrollPercent / 100) {
                this.onScrollAction.emit(null);
            }
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}
