import { Directive, OnDestroy, OnInit, ElementRef, Input, Optional, Self, Inject } from '@angular/core';
import { Subscription } from 'rxjs';

import { TableScrollable, TableScrollDispatcherService, TABLE_SCROLLABLE } from '../table-scroll-dispatcher.service';

/**
 * Table Scroller.
 * Listen to table scroll dispatcher and scroll element accordingly
 *
 * For internal usage
 *
 */
@Directive({ selector: '[fdpTableScroller]' })
export class TableScrollerDirective implements OnInit, OnDestroy {
    /** Scroll type */
    @Input()
    fdpTableScroller: 'horizontal' | 'vertical' | 'both' = 'both';

    /** @hidden */
    private _subscriptions: Subscription = new Subscription();

    /** @hidden */
    constructor(
        private _elementRef: ElementRef<HTMLElement>,
        private _tableScrollDispatcher: TableScrollDispatcherService,
        @Optional() @Self() @Inject(TABLE_SCROLLABLE) private _scrollable: TableScrollable | null
    ) {}

    /** @hidden */
    ngOnInit(): void {
        this._listenToScroll();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @hidden */
    private _listenToScroll(): void {
        const scrollDirectionToListen = this.fdpTableScroller;

        if (scrollDirectionToListen === 'vertical') {
            this._subscriptions.add(
                this._tableScrollDispatcher.verticallyScrolled().subscribe((trigger) => {
                    this._scrollTop(trigger);
                })
            );
        }

        if (scrollDirectionToListen === 'horizontal') {
            this._subscriptions.add(
                this._tableScrollDispatcher.horizontallyScrolled().subscribe((trigger) => {
                    this._scrollLeft(trigger);
                })
            );
        }

        if (scrollDirectionToListen === 'both') {
            this._subscriptions.add(
                this._tableScrollDispatcher.scrolled().subscribe((trigger) => {
                    this._scrollTop(trigger);
                    this._scrollLeft(trigger);
                })
            );
        }
    }

    /** @hidden */
    private _scrollLeft(trigger: TableScrollable): void {
        const element = this._elementRef.nativeElement;
        const scrollable = this._scrollable;
        const scrollLeft = trigger.getScrollLeft();

        if (scrollable) {
            scrollable.setScrollLeft(scrollLeft, false);
            return;
        }

        if (element) {
            this._elementRef.nativeElement.scrollLeft = scrollLeft;
        }
    }

    /** @hidden */
    private _scrollTop(trigger: TableScrollable): void {
        const element = this._elementRef.nativeElement;
        const scrollable = this._scrollable;
        const scrollTop = trigger.getScrollTop();

        if (scrollable) {
            scrollable.setScrollTop(scrollTop, false);
            return;
        }

        if (element) {
            this._elementRef.nativeElement.scrollTop = scrollTop;
        }
    }
}
