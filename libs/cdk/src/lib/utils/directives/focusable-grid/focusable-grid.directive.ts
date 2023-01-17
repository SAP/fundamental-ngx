import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { AfterViewInit, ContentChildren, Directive, Input, QueryList } from '@angular/core';
import { map, merge, startWith, switchMap, takeUntil, tap } from 'rxjs';
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
    /** Whether after pressing right (left in rtl mode) on the last item in row first item of the next row should be made active. */
    @Input()
    wrapHorizontally = false;

    /** Specifies which item to select in next row if its length smaller than current index. Nullish value means do not select. */
    @Input()
    shortRowItem: Nullable<'first' | 'last'> = 'first';

    /** @hidden */
    @ContentChildren(FDK_FOCUSABLE_LIST_DIRECTIVE) private readonly _focusableLists: QueryList<FocusableListDirective>;

    /** @hidden */
    constructor(private readonly _destroy$: DestroyedService) {}

    /** @hidden */
    ngAfterViewInit(): void {
        this._focusableLists.changes
            .pipe(
                startWith(this._focusableLists),
                map((queryList: QueryList<FocusableListDirective>) => merge(...queryList.toArray())),
                switchMap((subject) => subject),
                tap(({ event, list, activeItemIndex }) => this._onKeydown(event, list, activeItemIndex)),
                takeUntil(this._destroy$)
            )
            .subscribe();
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
                if (this.wrapHorizontally && activeItemIndex === 0) {
                    event.preventDefault();
                    nextRowIndex = currentRowIndex - 1;
                    nextRowItemIndex = lists[nextRowIndex]?._focusableItems.length - 1;
                }
                break;
            case RIGHT_ARROW:
                if (this.wrapHorizontally && activeItemIndex === list._focusableItems.length - 1) {
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

            lists[nextRowIndex]._focusableListService.setActiveItem(itemIndex);
        }
    }

    /** @hidden */
    private _getItemIndex(list: FocusableListDirective, activeIndex: number): Nullable<number> {
        if (activeIndex >= 0 && activeIndex < list._focusableItems.length) {
            return activeIndex;
        }

        if (this.shortRowItem == null) {
            return null;
        }

        return this.shortRowItem === 'first' ? 0 : list._focusableItems.length - 1;
    }
}
