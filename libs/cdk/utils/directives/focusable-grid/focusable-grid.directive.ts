import { DOWN_ARROW, LEFT_ARROW, PAGE_DOWN, PAGE_UP, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import {
    AfterViewInit,
    ContentChildren,
    DestroyRef,
    Directive,
    EventEmitter,
    Injector,
    Input,
    Output,
    QueryList,
    booleanAttribute,
    effect,
    inject,
    runInInjectionContext
} from '@angular/core';
import { outputToObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge, startWith, switchMap } from 'rxjs';
import { KeyUtil } from '../../functions';
import { Nullable } from '../../models/nullable';
import {
    FDK_FOCUSABLE_ITEM_DIRECTIVE,
    FocusableItem,
    FocusableItemDirective,
    FocusableItemPosition,
    FocusableListPosition
} from '../focusable-item';
import { FDK_FOCUSABLE_LIST_DIRECTIVE, FocusableListDirective, ScrollPosition } from '../focusable-list';
import { FDK_FOCUSABLE_GRID_DIRECTIVE } from './focusable-grid.tokens';

export interface FocusableCellPosition {
    rowIndex: number;
    colIndex: number;
}

@Directive({
    selector: '[fdkFocusableGrid]',
    exportAs: 'fdkFocusableGrid',
    standalone: true,
    providers: [
        {
            provide: FDK_FOCUSABLE_GRID_DIRECTIVE,
            useExisting: FocusableGridDirective
        }
    ]
})
export class FocusableGridDirective implements AfterViewInit {
    /** Direction of the content. */
    @Input()
    contentDirection: 'ltr' | 'rtl' | null = 'ltr';

    /** Whether the item in the previous/next row should be selected when going out of the first/last cell in the row. Default is false. */
    @Input({ transform: booleanAttribute })
    wrapHorizontally = false;

    /** Specify which item to select in prev/next row if its length smaller than current index. Nullish value means do not select. Default is null. */
    @Input()
    shortRowFocus: Nullable<'first' | 'last'> = null;

    /** Event emitted when item focused, contains item's position info. */
    @Output()
    readonly itemFocused = new EventEmitter<FocusableItemPosition>();

    /** Event emitted when whole row focused, contains row's position info. */
    @Output()
    readonly rowFocused = new EventEmitter<FocusableListPosition>();

    /** @hidden */
    @ContentChildren(FDK_FOCUSABLE_LIST_DIRECTIVE, { descendants: true })
    private readonly _focusableLists: QueryList<FocusableListDirective>;

    /** @hidden */
    @ContentChildren(FDK_FOCUSABLE_ITEM_DIRECTIVE, { descendants: true })
    private readonly _focusableItems: QueryList<FocusableItemDirective>;

    /** @hidden */
    _preventKeydown = false;

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    private readonly _injector = inject(Injector);

    /** @hidden */
    private readonly _listItemEffects = new WeakSet<FocusableListDirective>();

    /** @hidden */
    private readonly _subscribedItems = new WeakSet<FocusableItemDirective>();

    /** @hidden */
    ngAfterViewInit(): void {
        this._focusableLists.changes
            .pipe(startWith(this._focusableLists), takeUntilDestroyed(this._destroyRef))
            .subscribe((lists) => {
                const totalRows = this._focusableLists.length;
                const listsLength = lists.length;
                for (let i = 0; i < listsLength; i++) {
                    const list = lists.get(i);
                    if (list) {
                        list._setGridPosition({ rowIndex: i, totalRows });
                        this._watchListItems(list);
                    }
                }
            });

        this._focusableItems.changes
            .pipe(startWith(this._focusableItems), takeUntilDestroyed(this._destroyRef))
            .subscribe((items) => {
                this._handleItemSubscriptions(items.toArray());
            });

        this._focusableLists.changes
            .pipe(
                startWith(this._focusableLists),
                switchMap((queryList: QueryList<FocusableListDirective>) => {
                    const lists = queryList.toArray();
                    return merge(...lists.map((list) => list._gridListFocused$));
                }),
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe((focusedEvent) => {
                this.rowFocused.emit(focusedEvent);

                const lists = this._focusableLists.toArray();
                const listsLength = lists.length;
                for (let i = 0; i < listsLength; i++) {
                    const list = lists[i];
                    list.setTabbable(false);
                    list._setItemsTabbable(false);
                }
            });

        this._focusableLists.changes
            .pipe(
                startWith(this._focusableLists),
                switchMap((queryList: QueryList<FocusableListDirective>) => {
                    const lists = queryList.toArray();
                    return merge(...lists.map((list) => list._gridItemFocused$));
                }),
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe((focusedEvent) => {
                this.itemFocused.emit(focusedEvent);

                const lists = this._focusableLists.toArray();
                const listsLength = lists.length;
                for (let i = 0; i < listsLength; i++) {
                    const list = lists[i];
                    list.setTabbable(false);
                    list._setItemsTabbable(false);
                }
            });

        this._focusableLists.changes
            .pipe(
                startWith(this._focusableLists),
                switchMap((queryList: QueryList<FocusableListDirective>) => {
                    const lists = queryList.toArray();
                    return merge(...lists.map((list) => list._keydown$));
                }),
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe(({ event, list, activeItemIndex }) => this._onKeydown(event, list, activeItemIndex));
    }

    /**
     * Focus cell by position.
     * @param position position of the cell
     */
    focusCell(position: FocusableCellPosition): void {
        const list = this._focusableLists.get(position.rowIndex);
        if (list) {
            list.setActiveItem(position.colIndex);
        }
    }

    /** @hidden */
    _onKeydown(event: KeyboardEvent, list: FocusableListDirective, activeItemIndex: Nullable<number>): void {
        if (
            !KeyUtil.isKeyCode(event, [UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, PAGE_DOWN, PAGE_UP]) ||
            this._preventKeydown
        ) {
            return;
        }

        const lists = this._focusableLists.toArray();
        const currentRowIndex = lists.findIndex((item) => item === list);
        let nextRowIndex: number | undefined;
        let nextRowItemIndex = activeItemIndex ?? 0;
        let scrollIntoView: ScrollPosition;

        const listItemsLength = list._focusableItems().length;
        const isFirstItemLtr = activeItemIndex === 0 && this.contentDirection !== 'rtl';
        const isLastItemRtl = activeItemIndex === listItemsLength - 1 && this.contentDirection === 'rtl';

        const isFirstItemRtl = activeItemIndex === 0 && this.contentDirection === 'rtl';
        const isLastItemLtr = activeItemIndex === listItemsLength - 1 && this.contentDirection !== 'rtl';

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
                    nextRowItemIndex = lists[nextRowIndex]?._focusableItems().length - 1;
                }
                break;
            case RIGHT_ARROW:
                if (this.wrapHorizontally && (isFirstItemRtl || isLastItemLtr)) {
                    event.preventDefault();
                    nextRowIndex = currentRowIndex + 1;
                    nextRowItemIndex = 0;
                }
                break;
            case PAGE_DOWN:
                event.preventDefault();
                nextRowIndex = lists.findLastIndex((item) => item._isVisible);
                scrollIntoView = 'top';
                break;
            case PAGE_UP:
                event.preventDefault();
                nextRowIndex = lists.findIndex((item) => item._isVisible);
                scrollIntoView = 'bottom';
                break;
        }

        const nextRow = lists[nextRowIndex ?? -1];
        if (nextRow) {
            if (nextRow.focusable) {
                nextRow.focus(scrollIntoView);
                return;
            }

            const itemIndex = this._getItemIndex(nextRow, nextRowItemIndex);
            if (itemIndex != null) {
                nextRow.setActiveItem(itemIndex, scrollIntoView);
            }
        }
    }

    /** @hidden */
    private _getItemIndex(list: FocusableListDirective, activeIndex: number): Nullable<number> {
        if (activeIndex >= 0 && activeIndex < list._focusableItems().length) {
            return activeIndex;
        }

        if (this.shortRowFocus == null) {
            return null;
        }

        return this.shortRowFocus === 'first' ? 0 : list._focusableItems().length - 1;
    }

    /** @hidden */
    private _handleItemSubscriptions(items: ReadonlyArray<FocusableItem>): void {
        const itemsLength = items.length;
        for (let i = 0; i < itemsLength; i++) {
            const item = items[i];
            if (!(item instanceof FocusableItemDirective) || this._subscribedItems.has(item)) {
                continue;
            }

            this._subscribedItems.add(item);

            outputToObservable(item.focusableChildElementFocused)
                .pipe(takeUntilDestroyed(this._destroyRef))
                .subscribe(() => {
                    const lists = this._focusableLists.toArray();
                    const listsLength = lists.length;
                    for (let j = 0; j < listsLength; j++) {
                        const focusableItems = lists[j]._focusableItems();
                        const focusableItemsLength = focusableItems.length;
                        for (let k = 0; k < focusableItemsLength; k++) {
                            const focusableItem = focusableItems[k];
                            focusableItem.setTabbable(false);
                            (focusableItem as FocusableItemDirective).enableTabbableElements();
                        }
                    }
                });
            outputToObservable(item._parentFocusableItemFocused)
                .pipe(takeUntilDestroyed(this._destroyRef))
                .subscribe(() => {
                    const lists = this._focusableLists.toArray();
                    const listsLength = lists.length;
                    for (let j = 0; j < listsLength; j++) {
                        const focusableItems = lists[j]._focusableItems();
                        const focusableItemsLength = focusableItems.length;
                        for (let k = 0; k < focusableItemsLength; k++) {
                            const focusableItem = focusableItems[k];
                            if (item !== focusableItem) {
                                (focusableItem as FocusableItemDirective).disableTabbableElements();
                            } else {
                                (focusableItem as FocusableItemDirective).enableTabbableElements();
                            }
                        }
                    }
                });
        }
    }

    /** @hidden */
    private _watchListItems(list: FocusableListDirective): void {
        if (this._listItemEffects.has(list)) {
            return;
        }

        this._listItemEffects.add(list);
        runInInjectionContext(this._injector, () => {
            effect(() => {
                this._handleItemSubscriptions(list._focusableItems());
            });
        });
    }
}
