import { Directive, ElementRef, NgZone, OnDestroy, OnInit, forwardRef } from '@angular/core';
import { Subject, Observable, Observer, fromEvent } from 'rxjs';
import { filter, share, takeUntil, tap } from 'rxjs/operators';

import { TableScrollDispatcherService, TableScrollable, TABLE_SCROLLABLE } from '../table-scroll-dispatcher.service';

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
    providers: [{ provide: TABLE_SCROLLABLE, useExisting: forwardRef(() => TableScrollableDirective) }]
})
export class TableScrollableDirective implements TableScrollable, OnInit, OnDestroy {
    /** @hidden */
    private _destroyed = new Subject<void>();

    /** @hidden */
    private _skipEvent = false;

    /** @hidden */
    private _prevScrollTop = 0;

    /** @hidden */
    private _prevScrollLeft = 0;

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
        takeUntil(this._destroyed),
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
        protected elementRef: ElementRef<HTMLElement>,
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
        this._destroyed.next();
        this._destroyed.complete();
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

    /** Get scrollable ElementRef of. */
    getElementRef(): ElementRef<HTMLElement> {
        return this.elementRef;
    }
}
