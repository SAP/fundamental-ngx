import { Directive, ElementRef, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Subject, Observable, Observer, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { TableScrollDispatcherService } from '../table-scroll-dispatcher.service';

/**
 * Table Scrollable.
 * That directive should be assigned to table scrollable area.
 * It registers itself in table scroll dispatcher
 * and notify once element scrolled.
 * 
 * For internal usage.
 */
@Directive({ selector: '[fdpTableScrollable]' })
export class TableScrollable implements OnInit, OnDestroy {
    /** @hidden */
    private _destroyed = new Subject<void>();

    /** Scroll events stream */
    private _elementScrollStream: Observable<Event> = new Observable((observer: Observer<Event>) =>
        this.ngZone.runOutsideAngular(() =>
            fromEvent(this.elementRef.nativeElement, 'scroll').pipe(takeUntil(this._destroyed)).subscribe(observer)
        )
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

    /** Returns scrollTop position of the host element. */
    getScrollTop(): number {
        return this.elementRef.nativeElement?.scrollTop;
    }

    /** Returns scrollLeft position of the host element. */
    getScrollLeft(): number {
        return this.elementRef.nativeElement?.scrollLeft;
    }

    /** Get scrollable ElementRef of. */
    getElementRef(): ElementRef<HTMLElement> {
        return this.elementRef;
    }
}
