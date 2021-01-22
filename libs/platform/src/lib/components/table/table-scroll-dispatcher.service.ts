import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

import { TableScrollable } from './directives/table-scrollable.directive';

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
