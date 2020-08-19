import { FocusKeyManager, FocusOrigin } from '@angular/cdk/a11y';
import { QueryList } from '@angular/core';
import { KeyboardSupportItemInterface } from '../../interfaces/keyboard-support-item.interface';
import { merge, Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { KeyUtil } from '../../functions/key-util';


export class KeyboardSupportService<T> {

    /** Function that is supposed to be called, when focus escape before list */
    focusEscapeBeforeList: (keyboardEvent: KeyboardEvent) => void;

    /** Function that is supposed to be called, when focus escape after list */
    focusEscapeAfterList: (keyboardEvent: KeyboardEvent) => void;

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    onDestroy$: Subject<void> = new Subject<void>();

    /** An RxJS Subject that will kill the data stream upon queryList changes (for unsubscribing)  */
    private readonly _onRefresh$: Subject<void> = new Subject<void>();

    private _keyManager: FocusKeyManager<T>;

    setKeyboardService(queryList: QueryList<KeyboardSupportItemInterface & T>, wrap?: boolean): void {
        this._keyManager = new FocusKeyManager(queryList).withWrap(wrap);
        queryList.changes.pipe(
            takeUntil(this.onDestroy$),
            startWith(0)
        ).subscribe(() => this._refreshEscapeLogic(queryList));
    }

    onKeyDown(event: KeyboardEvent): void {
        this._keyManager.onKeydown(event);
    }

    get keyManager(): FocusKeyManager<T> {
        return this._keyManager;
    }

    /** @hidden */
    private _refreshEscapeLogic(queryList: QueryList<KeyboardSupportItemInterface & T>): void {

        /** Finish all of the streams, form before */
        this._onRefresh$.next();
        /** Merge refresh/destroy observables */
        const refreshObs = merge(this._onRefresh$, this.onDestroy$);
        if (queryList.first) {
            queryList.first.keyDown.pipe(takeUntil(refreshObs)).subscribe(event => {
                if (this.focusEscapeBeforeList && KeyUtil.isKey(event, 'ArrowUp')) {
                    this.focusEscapeBeforeList(event);
                }
            })
        }

        if (queryList.last) {
            queryList.last.keyDown.pipe(takeUntil(refreshObs)).subscribe(event => {
                if (this.focusEscapeAfterList && KeyUtil.isKey(event, 'ArrowDown')) {
                    this.focusEscapeAfterList(event);
                }
            })
        }
    }
}
