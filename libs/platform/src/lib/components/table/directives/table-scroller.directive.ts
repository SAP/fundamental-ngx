import { Directive, OnDestroy, OnInit, ElementRef, Input } from '@angular/core';
import { Subscription } from 'rxjs';

import { TableScrollDispatcherService } from '../table-scroll-dispatcher.service';

/**
 * Table Scroller.
 * Listen to tableD scroll dispatcher and scroll element accordingly 
 * 
 * For internal usage
 * 
 */
@Directive({ selector: '[fdpTableScroller]' })
export class FdpTableScroller implements OnInit, OnDestroy {
    /** Scroll type */
    @Input()
    fdpTableScroller: 'horizontal' | 'vertical' | 'both' = 'both';

    /** @hidden */
    private _subscriptions: Subscription = new Subscription();

    /** @hidden */
    constructor(
        private _elementRef: ElementRef<HTMLElement>,
        private _tableScrollDispatcher: TableScrollDispatcherService
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
        this._subscriptions.add(
            this._tableScrollDispatcher.scrolled().subscribe((scrollable) => {
                const element = this._elementRef.nativeElement;
                const scrollDirection = this.fdpTableScroller;
                if (!element) {
                    return;
                }
                if (scrollDirection === 'vertical'  || scrollDirection === 'both') {
                    this._elementRef.nativeElement.scrollTop = scrollable.getScrollTop();
                }
                if (scrollDirection === 'horizontal' || scrollDirection === 'both') {
                    this._elementRef.nativeElement.scrollLeft = scrollable.getScrollLeft();
                }
            })
        );
    }
}
