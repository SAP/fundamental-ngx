import { FocusKeyManager } from '@angular/cdk/a11y';
import { DOWN_ARROW, TAB, UP_ARROW, hasModifierKey } from '@angular/cdk/keycodes';
import { DestroyRef, Injectable, OnDestroy, QueryList, inject } from '@angular/core';
import { outputToObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, Subject, merge } from 'rxjs';
import { filter, startWith, takeUntil, tap } from 'rxjs/operators';
import { KeyUtil } from '../../functions';
import { destroyObservable } from '../../helpers/destroy-observable';
import { KeyboardSupportItemInterface } from '../../interfaces/keyboard-support-item.interface';

export type FocusEscapeDirection = 'up' | 'down';

@Injectable()
export class KeyboardSupportService<T> implements OnDestroy {
    /** Subject that is thrown, when focus escapes the list */
    focusEscapeList = new Subject<FocusEscapeDirection>();

    /** @hidden  */
    private readonly _destroyRef = inject(DestroyRef);

    /** An RxJS Subject that will kill the data stream upon queryList changes (for unsubscribing)  */
    private readonly _onRefresh$: Subject<void> = new Subject<void>();

    /** @hidden */
    private _keyManager: FocusKeyManager<T>;

    /** @hidden */
    get keyManager(): FocusKeyManager<T> {
        return this._keyManager;
    }

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
        this._keyManager?.destroy();
        this._tabKeyNavigation = tabKeyNavigation;
        this._keyManager = new FocusKeyManager(queryList).withWrap(wrap).withHomeAndEnd();
        queryList.changes
            .pipe(startWith(0), takeUntilDestroyed(this._destroyRef))
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
    ngOnDestroy(): void {
        this._keyManager?.destroy();
    }

    /** @hidden */
    private _refreshEscapeLogic(queryList: QueryList<KeyboardSupportItemInterface & T>): void {
        const createEscapeListener = (
            listItem: KeyboardSupportItemInterface & T,
            onKeyCode: number,
            escapeDirection: FocusEscapeDirection
        ): void => {
            // Convert OutputEmitterRef to observable
            const keyDown$: Observable<KeyboardEvent> = outputToObservable(listItem.keyDown);

            keyDown$
                .pipe(
                    takeUntil(unsubscribe$),
                    filter((event) => KeyUtil.isKeyCode(event, onKeyCode)),
                    tap((event) => event.preventDefault())
                )
                .subscribe(() => this.focusEscapeList.next(escapeDirection));
        };

        /** Finish all of the streams, form before */
        this._onRefresh$.next();

        const unsubscribe$ = merge(this._onRefresh$, destroyObservable(this._destroyRef));

        if (queryList.length) {
            createEscapeListener(queryList.last, DOWN_ARROW, 'down');
            createEscapeListener(queryList.first, UP_ARROW, 'up');
        }
    }
}
