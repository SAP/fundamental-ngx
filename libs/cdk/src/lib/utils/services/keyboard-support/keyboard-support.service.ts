import { FocusKeyManager } from '@angular/cdk/a11y';
import { Injectable, QueryList } from '@angular/core';
import { KeyboardSupportItemInterface } from '../../interfaces/keyboard-support-item.interface';
import { merge, Subject } from 'rxjs';
import { filter, startWith, takeUntil, tap } from 'rxjs/operators';
import { KeyUtil } from '../../functions';
import { DOWN_ARROW, hasModifierKey, TAB, UP_ARROW } from '@angular/cdk/keycodes';

export type FocusEscapeDirection = 'up' | 'down';

@Injectable({ providedIn: 'root' })
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
    private _itemList: QueryList<KeyboardSupportItemInterface & T>;

    /** @hidden
     * allow tab key navigation. default is true.
     */
    private _tabKeyNavigation = true;

    /** @hidden */
    setKeyboardService(
        queryList: QueryList<KeyboardSupportItemInterface & T>,
        wrap?: boolean,
        tabKeyNavigation = true
    ): void {
        this._itemList = queryList;
        this._tabKeyNavigation = tabKeyNavigation;
        this._keyManager = new FocusKeyManager(queryList).withWrap(wrap).withHomeAndEnd();
        queryList.changes
            .pipe(takeUntil(this._onDestroy$), startWith(0))
            .subscribe(() => this._refreshEscapeLogic(queryList));
    }

    /** @hidden */
    onKeyDown(event: KeyboardEvent): void {
        this._keyManager.onKeydown(event);
        if (KeyUtil.isKeyCode(event, TAB)) {
            if (KeyUtil.isKeyCode(event, TAB) && this._tabKeyNavigation) {
                event.preventDefault();
                hasModifierKey(event, 'shiftKey')
                    ? this.keyManager.setPreviousItemActive()
                    : this.keyManager.setNextItemActive();
            }
        }
    }

    /** Destroys KeyboardSupportService dependencies */
    onDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** @hidden */
    private _refreshEscapeLogic(queryList: QueryList<KeyboardSupportItemInterface & T>): void {
        const createEscapeListener = (
            listItem: KeyboardSupportItemInterface & T,
            onKeyCode: number,
            escapeDirection: FocusEscapeDirection
        ): void => {
            listItem.keyDown
                .pipe(
                    takeUntil(unsubscribe$),
                    filter((event) => KeyUtil.isKeyCode(event, onKeyCode)),
                    tap((event) => event.preventDefault())
                )
                .subscribe(() => this.focusEscapeList.next(escapeDirection));
        };

        /** Finish all of the streams, form before */
        this._onRefresh$.next();

        const unsubscribe$ = merge(this._onRefresh$, this._onDestroy$);

        if (queryList.length) {
            createEscapeListener(queryList.last, DOWN_ARROW, 'down');
            createEscapeListener(queryList.first, UP_ARROW, 'up');
        }
    }
}
