import { FocusKeyManager } from '@angular/cdk/a11y';
import { QueryList } from '@angular/core';
import { KeyboardSupportItemInterface } from '../../interfaces/keyboard-support-item.interface';
import { merge, Subject } from 'rxjs';
import { filter, startWith, takeUntil, tap } from 'rxjs/operators';
import { KeyUtil } from '../../functions/key-util';

export type FocusEscapeDirection = 'up' | 'down';

export class KeyboardSupportService<T> {

    /** Subject that is thrown, when focus escapes the list */
    focusEscapeList = new Subject<FocusEscapeDirection>();

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** An RxJS Subject that will kill the data stream upon queryList changes (for unsubscribing)  */
    private readonly _onRefresh$: Subject<void> = new Subject<void>();

    /** @hidden */
    private _keyManager: FocusKeyManager<T>;

    /** @hidden */
    get keyManager(): FocusKeyManager<T> {
        return this._keyManager;
    }

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

    /** Destroys KeyboardSupportService dependencies */
    onDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** @hidden */
    private _refreshEscapeLogic(queryList: QueryList<KeyboardSupportItemInterface & T>): void {

        const createEscapeListener = (
            listItem: KeyboardSupportItemInterface & T, onKey: string, escapeDirection: FocusEscapeDirection
        ): void => {
            listItem.keyDown.pipe(
                takeUntil(unsubscribe$),
                filter(event => KeyUtil.isKey(event, onKey)),
                tap(() => event.preventDefault())
            ).subscribe(() => this.focusEscapeList.next(escapeDirection));
        };

        /** Finish all of the streams, form before */
        this._onRefresh$.next();

        const unsubscribe$ = merge(this._onRefresh$, this._onDestroy$);

        if (queryList.length) {
            createEscapeListener(queryList.last, 'ArrowDown', 'down');
            createEscapeListener(queryList.first, 'ArrowUp', 'up');
        }
    }
}
