import { ElementRef, Injectable, InjectionToken, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

export interface TableScrollable {
    /** Returns observable that emits when a scroll event is fired on the host element. */
    getScrollStream(): Observable<Event>;

    /** Returns observable that emits when a vertical scroll event is happened on the host element. */
    getVerticalScrollStream(): Observable<Event>;

    /** Returns observable that emits when a horizontal scroll event is happened on the host element. */
    getHorizontalScrollStream(): Observable<Event>;

    /** Returns scrollTop position of the host element. */
    getScrollTop(): number;

    /** Returns scrollLeft position of the host element. */
    getScrollLeft(): number;

    /** Set scrollTop position of the host element. */
    setScrollTop(scrollTop: number, emitEvent: boolean): void;

    /** Set scrollLeft position of the host element. */
    setScrollLeft(scrollLeft: number, emitEvent: boolean): void;

    /** Get scrollable ElementRef of. */
    elementRef: ElementRef<HTMLElement>;

    /** Scrolls to overlapped cell. */
    scrollToOverlappedCell(rtl: boolean, freezableColumnsSize: number, freezableEndColumnSize: number): void;

    /** Set Scroll Position during component initialization. */
    initializeScrollTop(scrollTop: number): void;
}

export const TABLE_SCROLLABLE = new InjectionToken<TableScrollable>('Table Scrollable');

@Injectable()
export class TableScrollDispatcherService implements OnDestroy {
    /** @hidden */
    private _scrollSubject: Subject<TableScrollable> = new Subject();
    /** @hidden */
    private _verticalScrollSubject: Subject<TableScrollable> = new Subject();
    /** @hidden */
    private _horizontalScrollSubject: Subject<TableScrollable> = new Subject();
    /** @hidden */
    private _scrollableSubscriptionsMap: Map<TableScrollable, Subscription> = new Map();

    /** @hidden */
    register(scrollable: TableScrollable): void {
        if (this._scrollableSubscriptionsMap.has(scrollable)) {
            return;
        }

        const sub = new Subscription();
        sub.add(scrollable.getScrollStream().subscribe(() => this._scrollSubject.next(scrollable)));
        sub.add(scrollable.getHorizontalScrollStream().subscribe(() => this._horizontalScrollSubject.next(scrollable)));
        sub.add(scrollable.getVerticalScrollStream().subscribe(() => this._verticalScrollSubject.next(scrollable)));

        this._scrollableSubscriptionsMap.set(scrollable, sub);
    }

    /** @hidden */
    deregister(scrollable: TableScrollable): void {
        if (!this._scrollableSubscriptionsMap.has(scrollable)) {
            return;
        }

        this._scrollableSubscriptionsMap.get(scrollable)?.unsubscribe();
    }

    /** Scroll stream */
    scrolled(): Observable<TableScrollable> {
        return this._scrollSubject.asObservable();
    }

    /** Horizontal scroll stream */
    horizontallyScrolled(): Observable<TableScrollable> {
        return this._horizontalScrollSubject.asObservable();
    }

    /** Vertical scroll stream */
    verticallyScrolled(): Observable<TableScrollable> {
        return this._verticalScrollSubject.asObservable();
    }

    /** @hidden */
    ngOnDestroy(): void {
        Array.from(this._scrollableSubscriptionsMap.values()).forEach((subscription) => subscription.unsubscribe());

        this._scrollableSubscriptionsMap.clear();
    }
}
