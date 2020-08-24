import { FocusKeyManager } from '@angular/cdk/a11y';
import { QueryList } from '@angular/core';
import { KeyboardSupportItemInterface } from '../../interfaces/keyboard-support-item.interface';
import { merge, Subject } from 'rxjs';
import { filter, startWith, takeUntil } from 'rxjs/operators';
import { KeyUtil } from '../../functions/key-util';

export type FocusEscapeDirection = 'up' | 'down';

export class KeyboardSupportService<T> {

    /** Subject that is thrown, when focus escapes the list */
    focusEscapeList = new Subject<FocusEscapeDirection>()

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** An RxJS Subject that will kill the data stream upon queryList changes (for unsubscribing)  */
    private readonly _onRefresh$: Subject<void> = new Subject<void>();

    /** @hidden */
    private _keyManager: FocusKeyManager<T>;

    /** @hidden */
    setKeyboardService(queryList: QueryList<KeyboardSupportItemInterface & T>, wrap?: boolean): void {
        this._keyManager = new FocusKeyManager(queryList).withWrap(wrap).withHomeAndEnd();
        queryList.changes.pipe(
            takeUntil(this._onDestroy$),
            startWith(0)
        ).subscribe(() => this._refreshEscapeLogic(queryList));
    }

    /** @hidden */
    onKeyDown(event: KeyboardEvent): void {
        this._keyManager.onKeydown(event);
    }

    /** @hidden */
    get keyManager(): FocusKeyManager<T> {
        return this._keyManager;
    }

    public onDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** @hidden */
    private _refreshEscapeLogic(queryList: QueryList<KeyboardSupportItemInterface & T>): void {

        /** Finish all of the streams, form before */
        this._onRefresh$.next();
        /** Merge refresh/destroy observables */
        const refreshObs = merge(this._onRefresh$, this._onDestroy$);
        if (queryList.first) {
            queryList.first.keyDown.pipe(
                takeUntil(refreshObs),
                filter(event => KeyUtil.isKey(event, 'ArrowUp'))
            ).subscribe(() => {
                event.preventDefault();
                this.focusEscapeList.next('up');
            })
        }

        if (queryList.last) {
            queryList.last.keyDown.pipe(
                takeUntil(refreshObs),
                filter(event => KeyUtil.isKey(event, 'ArrowDown'))
            ).subscribe(() => {
                event.preventDefault();
                this.focusEscapeList.next('down');
            })
        }
    }
}
