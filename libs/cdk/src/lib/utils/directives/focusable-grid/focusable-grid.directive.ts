import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { AfterViewInit, ContentChildren, Directive, Input, QueryList } from '@angular/core';
import { merge, startWith, switchMap, takeUntil } from 'rxjs';
import { KeyUtil } from '../../functions';
import { Nullable } from '../../models/nullable';
import { DestroyedService } from '../../services';
import { FDK_FOCUSABLE_LIST_DIRECTIVE, FocusableListDirective } from '../focusable-list';

@Directive({
    selector: '[fdkFocusableGrid]',
    exportAs: 'fdkFocusableGrid',
    standalone: true,
    providers: [DestroyedService]
})
export class FocusableGridDirective implements AfterViewInit {
    /** Direction of the content. */
    @Input()
    contentDirection: 'ltr' | 'rtl' | null = 'ltr';

    /** Whether the item in the previous/next row should be selected when going out of the first/last cell in the row. Default is false. */
    @Input()
    set wrapHorizontally(value: BooleanInput) {
        this._wrapHorizontally = coerceBooleanProperty(value);
    }

    get wrapHorizontally(): boolean {
        return this._wrapHorizontally;
    }

    /** Specify which item to select in prev/next row if its length smaller than current index. Nullish value means do not select. Default is null. */
    @Input()
    shortRowFocus: Nullable<'first' | 'last'> = null;

    /** @hidden */
    private _wrapHorizontally = false;

    /** @hidden */
    @ContentChildren(FDK_FOCUSABLE_LIST_DIRECTIVE)
    private readonly _focusableLists: QueryList<FocusableListDirective>;

    /** @hidden */
    constructor(private readonly _destroy$: DestroyedService) {}

    /** @hidden */
    ngAfterViewInit(): void {
        this._focusableLists.changes
            .pipe(startWith(this._focusableLists), takeUntil(this._destroy$))
            .subscribe((lists) =>
                lists.forEach((list, index) =>
                    list._setPosition({ row: index, totalRows: this._focusableLists.length })
                )
            );

        this._focusableLists.changes
            .pipe(
                startWith(this._focusableLists),
                switchMap((queryList: QueryList<FocusableListDirective>) =>
                    merge(...queryList.toArray().map((list) => list._itemFocused$))
                ),
                takeUntil(this._destroy$)
            )
            .subscribe(() => this._focusableLists.forEach((list) => list._setItemsTabbable(false)));

        this._focusableLists.changes
            .pipe(
                startWith(this._focusableLists),
                switchMap((queryList: QueryList<FocusableListDirective>) =>
                    merge(...queryList.toArray().map((list) => list._keydown$))
                ),
                takeUntil(this._destroy$)
            )
            .subscribe(({ event, list, activeItemIndex }) => this._onKeydown(event, list, activeItemIndex));
    }

    /** @hidden */
    _onKeydown(event: KeyboardEvent, list: FocusableListDirective, activeItemIndex: Nullable<number>): void {
        if (activeItemIndex == null) {
            return;
        }

        if (!KeyUtil.isKeyCode(event, [UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW])) {
            return;
        }

        const lists = this._focusableLists.toArray();
        const currentRowIndex = lists.findIndex((item) => item === list);
        let nextRowIndex: number | null = null;
        let nextRowItemIndex = activeItemIndex;

        const isFirstItemLtr = activeItemIndex === 0 && this.contentDirection !== 'rtl';
        const isLastItemRtl = activeItemIndex === list._focusableItems.length - 1 && this.contentDirection === 'rtl';

        const isFirstItemRtl = activeItemIndex === 0 && this.contentDirection === 'rtl';
        const isLastItemLtr = activeItemIndex === list._focusableItems.length - 1 && this.contentDirection !== 'rtl';

        switch (event.keyCode) {
            case UP_ARROW:
                event.preventDefault();
                nextRowIndex = currentRowIndex - 1;
                break;
            case DOWN_ARROW:
                event.preventDefault();
                nextRowIndex = currentRowIndex + 1;
                break;
            case LEFT_ARROW:
                if (this.wrapHorizontally && (isFirstItemLtr || isLastItemRtl)) {
                    event.preventDefault();
                    nextRowIndex = currentRowIndex - 1;
                    nextRowItemIndex = lists[nextRowIndex]?._focusableItems.length - 1;
                }
                break;
            case RIGHT_ARROW:
                if (this.wrapHorizontally && (isFirstItemRtl || isLastItemLtr)) {
                    event.preventDefault();
                    nextRowIndex = currentRowIndex + 1;
                    nextRowItemIndex = 0;
                }
                break;
        }

        if (nextRowIndex != null && lists[nextRowIndex]) {
            const itemIndex = this._getItemIndex(lists[nextRowIndex], nextRowItemIndex);
            if (itemIndex == null) {
                return;
            }

            lists[nextRowIndex].setActiveItem(itemIndex);
        }
    }

    /** @hidden */
    private _getItemIndex(list: FocusableListDirective, activeIndex: number): Nullable<number> {
        if (activeIndex >= 0 && activeIndex < list._focusableItems.length) {
            return activeIndex;
        }

        if (this.shortRowFocus == null) {
            return null;
        }

        return this.shortRowFocus === 'first' ? 0 : list._focusableItems.length - 1;
    }
}
