import { ElementRef, Injectable, InjectionToken } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

export interface TableScrollable {
    /** Returns observable that emits when a scroll event is fired on the host element. */
    getScrollStream(): Observable<Event>;

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
export class TableScrollDispatcherService {
    private _scrollSubject: Subject<TableScrollable> = new Subject();
    private _scrollableSubscriptions: Map<TableScrollable, Subscription> = new Map();

    register(scrollable: TableScrollable): void {
        if (this._scrollableSubscriptions.has(scrollable)) {
            return;
        }
        this._scrollableSubscriptions.set(
            scrollable,
            scrollable.getScrollStream().subscribe(() => this._scrollSubject.next(scrollable))
        );
    }

    deregister(scrollable: TableScrollable): void {
        if (!this._scrollableSubscriptions.has(scrollable)) {
            return;
        }
        this._scrollableSubscriptions.get(scrollable).unsubscribe();
    }

    scrolled(): Observable<TableScrollable> {
        return this._scrollSubject.asObservable();
    }
}
