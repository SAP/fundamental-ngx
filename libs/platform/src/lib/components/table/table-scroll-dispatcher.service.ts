import { ElementRef, Injectable, InjectionToken, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

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
    getElementRef(): ElementRef<HTMLElement>;
}

export const TABLE_SCROLLABLE = new InjectionToken<TableScrollable>('Table Scrollable');

@Injectable()
export class TableScrollDispatcherService implements OnDestroy {
    private _scrollSubject: Subject<TableScrollable> = new Subject();
    private _verticalScrollSubject: Subject<TableScrollable> = new Subject();
    private _horizontalScrollSubject: Subject<TableScrollable> = new Subject();
    private _scrollableSubscriptionsMap: Map<TableScrollable, Subscription> = new Map();

    register(scrollable: TableScrollable): void {
        if (this._scrollableSubscriptionsMap.has(scrollable)) {
            return;
        }
        this._scrollableSubscriptionsMap.set(
            scrollable,
            new Subscription()
                .add(scrollable.getScrollStream().subscribe(() => this._scrollSubject.next(scrollable)))
                .add(
                    scrollable
                        .getHorizontalScrollStream()
                        .subscribe(() => this._horizontalScrollSubject.next(scrollable))
                )
                .add(scrollable.getVerticalScrollStream().subscribe(() => this._verticalScrollSubject.next(scrollable)))
        );
    }

    deregister(scrollable: TableScrollable): void {
        if (!this._scrollableSubscriptionsMap.has(scrollable)) {
            return;
        }
        this._scrollableSubscriptionsMap.get(scrollable).unsubscribe();
    }

    /** Scroll stream */
    scrolled(): Observable<TableScrollable> {
        return this._scrollSubject.asObservable();
    }

    /** Horizontal Scroll stream */
    horizontallyScrolled(): Observable<TableScrollable> {
        return this._horizontalScrollSubject.asObservable();
    }

    /** Vertical Scroll stream */
    verticallyScrolled(): Observable<TableScrollable> {
        return this._verticalScrollSubject.asObservable();
    }

    /** @hidden */
    ngOnDestroy(): void {
        Array.from(this._scrollableSubscriptionsMap.values()).forEach((subscription) => {
            subscription.unsubscribe();
        });
        this._scrollableSubscriptionsMap.clear();
    }
}
