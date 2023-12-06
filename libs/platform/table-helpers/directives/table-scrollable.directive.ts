import { DOCUMENT } from '@angular/common';
import { DestroyRef, Directive, ElementRef, forwardRef, inject, NgZone, OnDestroy, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent, Observable, Observer } from 'rxjs';
import { filter, share, tap } from 'rxjs/operators';
import {
    TABLE_SCROLLABLE,
    TableScrollable,
    TableScrollDispatcherService
} from '../services/table-scroll-dispatcher.service';

/**
 * Table Scrollable.
 * That directive should be assigned to table scrollable area.
 * It registers itself in table scroll dispatcher
 * and notify once element scrolled.
 *
 * For internal usage.
 */
@Directive({
    selector: '[fdpTableScrollable]',
    exportAs: 'tableScrollable',
    standalone: true,
    providers: [{ provide: TABLE_SCROLLABLE, useExisting: forwardRef(() => TableScrollableDirective) }]
})
export class TableScrollableDirective implements TableScrollable, OnInit, OnDestroy {
    /** @hidden */
    private _skipEvent = false;

    /** @hidden */
    private _prevScrollTop = 0;

    /** @hidden */
    private _prevScrollLeft = 0;

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    private readonly _document = inject(DOCUMENT);

    /** Scroll events stream */
    private _elementScrollStream: Observable<Event> = new Observable((observer: Observer<Event>) => {
        const subscription = this.ngZone.runOutsideAngular(() =>
            fromEvent(this.elementRef.nativeElement, 'scroll').subscribe(observer)
        );
        return () => subscription.unsubscribe();
    }).pipe(
        filter(() => {
            if (this._skipEvent) {
                this._skipEvent = false;
                return false;
            }
            return true;
        }),
        takeUntilDestroyed(this._destroyRef),
        share()
    );

    /** Vertical scroll stream */
    private _elementVerticalScrollStream: Observable<Event> = this._elementScrollStream.pipe(
        filter(() => this._prevScrollTop !== this.getScrollTop()),
        tap(() => (this._prevScrollTop = this.getScrollTop()))
    );

    /** Horizontal scroll stream */
    private _elementHorizontalScrollStream: Observable<Event> = this._elementScrollStream.pipe(
        filter(() => this._prevScrollLeft !== this.getScrollLeft()),
        tap(() => (this._prevScrollLeft = this.getScrollLeft()))
    );

    /** @hidden */
    constructor(
        public elementRef: ElementRef<HTMLElement>,
        protected scrollDispatcher: TableScrollDispatcherService,
        protected ngZone: NgZone
    ) {}

    /** @hidden */
    ngOnInit(): void {
        this.scrollDispatcher.register(this);
    }

    /** @hidden */
    ngOnDestroy(): void {
        this.scrollDispatcher.deregister(this);
    }

    /** Returns observable that emits when a scroll event is fired on the host element. */
    getScrollStream(): Observable<Event> {
        return this._elementScrollStream;
    }

    /** Returns observable that emits when a vertical scroll event is happened on the host element. */
    getVerticalScrollStream(): Observable<Event> {
        return this._elementVerticalScrollStream;
    }

    /** Returns observable that emits when a horizontal scroll event is happened on the host element. */
    getHorizontalScrollStream(): Observable<Event> {
        return this._elementHorizontalScrollStream;
    }

    /** Returns scrollTop position of the host element. */
    getScrollTop(): number {
        return this.elementRef.nativeElement?.scrollTop;
    }

    /** Returns scrollLeft position of the host element. */
    getScrollLeft(): number {
        return this.elementRef.nativeElement?.scrollLeft;
    }

    /** Set scrollTop position of the host element. */
    setScrollTop(scrollTop: number, emitEvent = true): void {
        if (!this.elementRef.nativeElement || this.elementRef.nativeElement.scrollTop === scrollTop) {
            return;
        }
        this._skipEvent = !emitEvent;
        this.elementRef.nativeElement.scrollTop = scrollTop;
    }

    /** Set scrollLeft position of the host element. */
    setScrollLeft(scrollLeft: number, emitEvent = true): void {
        if (!this.elementRef.nativeElement || this.elementRef.nativeElement.scrollLeft === scrollLeft) {
            return;
        }
        this._skipEvent = !emitEvent;
        this.elementRef.nativeElement.scrollLeft = scrollLeft;
    }

    /** Scrolls to overlapped cell. */
    scrollToOverlappedCell(rtl: boolean, freezableColumnsSize: number, freezableEndColumnSize: number): void {
        const tableScrollableEl = this.elementRef.nativeElement;
        const isRtl = rtl;

        if (
            (freezableColumnsSize || freezableEndColumnSize) &&
            tableScrollableEl.scrollWidth > tableScrollableEl.clientWidth
        ) {
            const activeEl = this._document.activeElement;
            if (
                activeEl &&
                !(
                    activeEl.classList.contains('fd-table__cell--fixed') ||
                    activeEl.classList.contains('fd-table__cell--fixed-end')
                )
            ) {
                if (freezableColumnsSize && !freezableEndColumnSize) {
                    activeEl.scrollIntoView({ block: 'nearest', inline: 'end' });
                } else if (!freezableColumnsSize && freezableEndColumnSize) {
                    activeEl.scrollIntoView({ block: 'nearest', inline: 'center' });
                } else if (freezableColumnsSize && freezableEndColumnSize) {
                    // check to see if another element obstructs the active element
                    const activeElmRect = activeEl.getBoundingClientRect();
                    const activeElLeft = activeElmRect.left;
                    const activeElTop = activeElmRect.top;
                    const activeElWidth = activeElmRect.width;
                    const topElementFromLeft = this._document.elementFromPoint(activeElLeft, activeElTop);
                    // if the activeEl is overlapped
                    if (
                        topElementFromLeft &&
                        !activeEl.isSameNode(topElementFromLeft) &&
                        topElementFromLeft.classList.contains('fd-table__cell--fixed-end')
                    ) {
                        const topElementX = topElementFromLeft.getBoundingClientRect().left;
                        const leftVal = isRtl
                            ? (activeElLeft + activeElWidth - topElementX) * -1
                            : activeElLeft + activeElWidth - topElementX;
                        tableScrollableEl.scrollBy({ top: 0, left: leftVal });
                    } else if (
                        topElementFromLeft &&
                        !activeEl.isSameNode(topElementFromLeft) &&
                        topElementFromLeft.classList.contains('fd-table__cell--fixed')
                    ) {
                        const topElementX = topElementFromLeft.getBoundingClientRect().right;
                        const leftVal = isRtl
                            ? (activeElLeft - activeElWidth - topElementX) * -1
                            : activeElLeft - activeElWidth - topElementX;
                        tableScrollableEl.scrollBy({ top: 0, left: leftVal });
                    }
                }
            }
        }
    }

    /** Set Scroll Position during component initialization. */
    initializeScrollTop(scrollTop: number): void {
        this.ngZone.runOutsideAngular(() => {
            setTimeout(() => {
                this.setScrollTop(scrollTop, false);
            });
        });
    }
}
