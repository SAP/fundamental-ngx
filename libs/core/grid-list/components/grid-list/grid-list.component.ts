import { DOWN_ARROW, END, HOME, LEFT_ARROW, RIGHT_ARROW, TAB, UP_ARROW } from '@angular/cdk/keycodes';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    DestroyRef,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    QueryList,
    SimpleChanges,
    ViewEncapsulation,
    computed,
    inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { KeyUtil, KeyboardSupportService, Nullable, RangeSelector, RtlService } from '@fundamental-ngx/cdk/utils';
import { BehaviorSubject, Observable, Subscription, filter } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { parseLayoutPattern } from '../../helpers/parse-layout-pattern';
import {
    GridListSelectionActions,
    GridListSelectionEvent,
    GridListSelectionMode
} from '../../models/grid-list-selection.models';
import { GridListItemComponent } from '../grid-list-item/grid-list-item.component';
import { GridList } from './grid-list-base.component';

let gridListUniqueId = 0;

@Component({
    selector: 'fd-grid-list',
    templateUrl: './grid-list.component.html',
    styleUrls: ['./grid-list.component.scss', '../../../../cdk/utils/drag-and-drop/drag-and-drop.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [KeyboardSupportService, { provide: GridList, useExisting: GridListComponent }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class GridListComponent<T> extends GridList<T> implements OnChanges, AfterContentInit, OnDestroy {
    /** id for the Element */
    @Input()
    id = `fd-grid-list-${gridListUniqueId++}`;

    /** width of the element */
    @Input()
    width: string;

    /** Sets the `aria-label` attribute to the element. */
    @Input()
    ariaLabel: Nullable<string>;

    /**
     * Defines the mode of Grid List
     * Modes:
     * - none: Default mode (no selection)
     * - delete: Delete mode (only one list item can be deleted via provided delete button)
     * - singleSelect: Selected item is highlighted but no selection control is visible (only one list item can be selected)
     * - singleSelectLeft: Left-positioned single selection mode (only one list item can be selected)
     * - singleSelectRight: Right-positioned single selection mode (only one list item can be selected)
     * - multiSelect: Multi-selection mode (more than one list item can be selected)
     *  */
    @Input()
    selectionMode: GridListSelectionMode = 'none';

    /**
     * specify the column layout in the format `XLn-Ln-Mn-Sn` where n is the number of columns and can be different for each size.
     * eg: XL2-L2-M2-S1 would create 2-column layouts for XL, L, and M sizes and single-column layout for S size.
     */
    @Input()
    layoutPattern: string;

    /** Event is thrown, when mode is singleSelect, singleSelectLeft, singleSelectRight or multiSelect and item was selected */
    @Output()
    selectionChange = new EventEmitter<GridListSelectionEvent<T>>();

    /** @hidden */
    @ContentChildren(GridListItemComponent, { descendants: true })
    set gridListItems(components: QueryList<GridListItemComponent<T>>) {
        this._gridListItems = components;
        this._updateGridListItemsProperties(components);
    }

    get gridListItems(): QueryList<GridListItemComponent<T>> {
        return this._gridListItems;
    }

    /** @hidden */
    readonly _selectedItems$: Observable<GridListSelectionEvent<T>>;

    /** @hidden */
    private _gridListItems: QueryList<GridListItemComponent<T>>;

    /** @hidden */
    private readonly _rangeSelector = new RangeSelector();

    /** @hidden */
    private readonly _selectedItems: GridListSelectionEvent<T> = {
        added: [],
        index: [],
        removed: [],
        selection: []
    };

    /** @hidden */
    private readonly _selectedItemsSubject$ = new BehaviorSubject<GridListSelectionEvent<T>>(this._selectedItems);

    /** @hidden */
    private readonly subscription = new Subscription();

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    private readonly _cd = inject(ChangeDetectorRef);

    /** @hidden */
    private readonly _elRef = inject(ElementRef);

    /** @hidden */
    private readonly _rtlService = inject(RtlService, {
        optional: true
    });

    /** @hidden */
    private readonly _isRtl = computed<boolean>(() => this._rtlService?.rtl() ?? false);

    /** @hidden */
    constructor() {
        super();
        this._selectedItems$ = this._selectedItemsSubject$.asObservable();
        const selectedItemsSub = this._selectedItems$
            .pipe(filter(() => !!this._gridListItems))
            .subscribe(this.selectionChange);

        this.subscription.add(selectedItemsSub);
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (
            changes.layoutPattern &&
            !changes.layoutPattern.firstChange &&
            changes.layoutPattern.previousValue !== changes.layoutPattern.currentValue
        ) {
            const baseLayoutItemPattern = parseLayoutPattern(this.layoutPattern);
            this._updateGridListItemsProperty('gridLayoutClasses', baseLayoutItemPattern);
        }

        if (
            changes.selectionMode &&
            !changes.selectionMode.firstChange &&
            changes.selectionMode.previousValue !== changes.selectionMode.currentValue
        ) {
            this._updateGridListItemsProperty('selectionMode', this.selectionMode);
        }
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this._setFirstFocusableItem();
        this._listenOnQueryChange();
        this._cd.detectChanges();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    /**
     * Clears previous selection of the items.
     */
    clearSelection(): void {
        this._selectedItems.added = [];
        this._selectedItems.index = [];
        this._selectedItems.removed = this._selectedItems.selection;
        this._selectedItems.selection = [];

        this._selectedItemsSubject$.next(this._selectedItems);
    }

    /** @hidden */
    setSelectedItem(
        item: T,
        componentIndex: number,
        action?: GridListSelectionActions | null,
        event?: PointerEvent
    ): void {
        if (!action) {
            this._selectedItems.added = [item];
            const selectedItem = this._selectedItems.selection[0];
            if (selectedItem) {
                this._selectedItems.removed = [selectedItem];
            }

            this._selectedItems.selection = [item];
            this._selectedItems.index = [componentIndex];

            this._selectedItemsSubject$.next(this._selectedItems);

            return;
        }

        this._rangeSelector.onRangeElementToggled(componentIndex, event);
        const state = this._rangeSelector.lastRangeSelectionState;
        if (!state) {
            return;
        }
        const itemIndexes = new Array(state.to - state.from + 1).fill(null).map((e, i) => state.from + i);
        const selectedItems = itemIndexes.map((idx) => this.gridListItems.get(idx)?.value).filter((v): v is T => !!v);
        const itemsSet = new Set<T>(selectedItems);

        if (action === GridListSelectionActions.ADD) {
            this._selectedItems.added = [...itemsSet.values()];
            this._selectedItems.index = [...itemIndexes];
            this._selectedItems.removed = [];

            // remove "itemsSet" values from selection and add them back from "itemsSet"
            // this is needed to avoid duplicates as some of the items can be already selected
            this._selectedItems.selection = this._selectedItems.selection.filter((e) => !itemsSet.has(e));
            this._selectedItems.selection.push(...itemsSet.values());
        }

        if (action === GridListSelectionActions.REMOVE) {
            this._selectedItems.added = [];
            this._selectedItems.index = [...itemIndexes];
            this._selectedItems.removed = [...itemsSet.values()];

            this._selectedItems.selection = this._selectedItems.selection.filter(
                (selectedItem) => !itemsSet.has(selectedItem)
            );
        }

        this._selectedItemsSubject$.next(this._selectedItems);
    }

    /** @hidden */
    handleKeydown(event: KeyboardEvent): void {
        this._handleTabKeydown(event);
        if (KeyUtil.isKeyCode(event, [UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW])) {
            if (event.shiftKey && this.selectionMode === 'multiSelect') {
                this._handleShiftArrowKeydown(event);
            } else {
                this._handleArrowKeydown(event);
            }
        } else if (event.shiftKey && this.selectionMode === 'multiSelect' && KeyUtil.isKeyCode(event, [HOME, END])) {
            this._handleHomeEndKeydown(event);
        }
    }
    /** @hidden */
    private _handleHomeEndKeydown(event: KeyboardEvent): void {
        event.preventDefault();
        let shouldSelect = false;
        let selectionAction;
        const isEndKeydown = KeyUtil.isKeyCode(event, END);
        const loopStartingIndex = isEndKeydown ? 0 : this._gridListItems.length - 1;
        /**
         * Ternary loop - if isEndKeydown is true, loop iterates from zero to the end of the grid list items.
         * If isEndKeydown is false, loop iterates backwards
         **/
        for (
            let index = loopStartingIndex;
            isEndKeydown ? index < this._gridListItems.length : index >= 0;
            isEndKeydown ? index++ : index--
        ) {
            const currentItem = this._gridListItems.toArray()[index];
            if (document.activeElement === currentItem._gridListItem.nativeElement) {
                shouldSelect = true;
                selectionAction = currentItem._selectedItem
                    ? GridListSelectionActions.ADD
                    : GridListSelectionActions.REMOVE;
            }
            if (shouldSelect) {
                this.setSelectedItem(currentItem as any, index, selectionAction);
            }
        }
        const itemToFocus = isEndKeydown
            ? this._gridListItems.last._gridListItem
            : this._gridListItems.first._gridListItem;
        itemToFocus.nativeElement.focus();
    }

    /** @hidden */
    private _handleTabKeydown(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, TAB) && !event.shiftKey) {
            const isFocused = this._gridListItems
                .toArray()
                .some((item) => item._gridListItem.nativeElement.contains(document.activeElement));
            const isChildFocused = this._gridListItems
                .toArray()
                .some((item) => item._gridListItem.nativeElement.querySelector(':focus'));
            if (isFocused && !isChildFocused) {
                this._gridListItems.forEach((item) => {
                    const interactiveElements = item._gridListItem.nativeElement.querySelectorAll(
                        'a, button, input, select, textarea'
                    );

                    // Set tabindex to -1 for all interactive elements in the grid
                    interactiveElements.forEach((element) => {
                        element.setAttribute('tabindex', '-1');
                    });
                });
                return;
            } else {
                this._gridListItems.forEach((item) => {
                    const interactiveElements = item._gridListItem.nativeElement.querySelectorAll(
                        'a, button, input, select, textarea'
                    );
                    interactiveElements.forEach((element) => {
                        element.setAttribute('tabindex', '0');
                    });
                });
                return;
            }
        }
    }

    /** @hidden */
    private _handleShiftArrowKeydown(event: KeyboardEvent): void {
        event.preventDefault();
        const activeElement = document.activeElement as HTMLElement;

        const currentItemIndex = this._getCurrentItemIndex(activeElement);
        if (currentItemIndex === -1) {
            return;
        }

        const indexToFocus = this._calculateIndexToFocus(event, currentItemIndex);
        if (indexToFocus === undefined) {
            return;
        }

        // Persist the selection state from the current item to the next item
        this._persistSelectionState(currentItemIndex, indexToFocus);

        // Focus the new item
        this._focusItemAtIndex(indexToFocus, activeElement);
    }

    /** @hidden */
    private _handleArrowKeydown(event: KeyboardEvent, isShiftPressed = false): void {
        event.preventDefault();
        const activeElement = document.activeElement as HTMLElement;

        const currentItemIndex = this._getCurrentItemIndex(activeElement);
        if (currentItemIndex === -1) {
            return;
        }

        const indexToFocus = this._calculateIndexToFocus(event, currentItemIndex);
        if (indexToFocus === undefined) {
            return;
        }

        if (isShiftPressed) {
            this._toggleSelection(indexToFocus);
        }

        this._focusItemAtIndex(indexToFocus, activeElement);
    }

    /** hidden */
    private _calculateIndexToFocus(event: KeyboardEvent, currentItemIndex: number): number | undefined {
        const itemsPerRow = this._getItemsPerRow(
            this._gridListItems.toArray()[currentItemIndex]._gridListItem.nativeElement
        );
        if (KeyUtil.isKeyCode(event, LEFT_ARROW) || (this._isRtl() && KeyUtil.isKeyCode(event, [RIGHT_ARROW]))) {
            return currentItemIndex - 1;
        } else if (KeyUtil.isKeyCode(event, RIGHT_ARROW) || (this._isRtl() && KeyUtil.isKeyCode(event, [LEFT_ARROW]))) {
            return currentItemIndex + 1;
        } else if (KeyUtil.isKeyCode(event, UP_ARROW)) {
            return currentItemIndex - itemsPerRow;
        } else if (KeyUtil.isKeyCode(event, DOWN_ARROW)) {
            return currentItemIndex + itemsPerRow;
        }
        return undefined;
    }

    /** hidden */
    private _persistSelectionState(currentIndex: number, indexToFocus: number): void {
        const currentItem = this._gridListItems.toArray()[currentIndex];
        const nextItem = this._gridListItems.toArray()[indexToFocus];

        // Persist the selection state from the current item to the next item
        if (currentItem._selectedItem) {
            // If the current item is selected, ensure the next item is selected as well
            if (!nextItem._selectedItem) {
                this.setSelectedItem(nextItem as any, indexToFocus, GridListSelectionActions.ADD);
            }
        } else {
            // If the current item is not selected, ensure the next item remains not selected
            if (nextItem._selectedItem) {
                this.setSelectedItem(nextItem as any, indexToFocus, GridListSelectionActions.REMOVE);
            }
        }
    }

    /** hidden */
    private _getCurrentItemIndex(activeElement: HTMLElement): number {
        return this._gridListItems
            .toArray()
            .findIndex((item) => item._gridListItem.nativeElement.contains(activeElement));
    }

    /** hidden */
    private _focusItemAtIndex(indexToFocus: number, activeElement: HTMLElement): void {
        if (indexToFocus >= 0 && indexToFocus < this._gridListItems.length) {
            const itemToFocus = this._gridListItems.toArray()[indexToFocus];
            if (itemToFocus && itemToFocus._gridListItem) {
                const elementToFocus = itemToFocus._gridListItem.nativeElement?.parentElement?.querySelector(
                    activeElement.tagName
                ) as HTMLElement;
                if (elementToFocus) {
                    elementToFocus.focus();
                }
            }
        }
    }

    /** hidden */
    private _toggleSelection(indexToFocus: number): void {
        const currentItem = this._gridListItems.toArray()[indexToFocus];
        const selectionAction = currentItem._selectedItem
            ? GridListSelectionActions.REMOVE
            : GridListSelectionActions.ADD;

        this.setSelectedItem(currentItem as any, indexToFocus, selectionAction);
    }

    /** @hidden */
    private _listenOnQueryChange(): void {
        this._gridListItems.changes.pipe(startWith(0), takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            setTimeout(() => {
                this._setFirstFocusableItem();
            });
        });
    }

    /** @hidden */
    private _setFirstFocusableItem(): void {
        this._gridListItems.toArray().forEach((item, index) => {
            item.tabIndex.set(index === 0 ? 0 : -1);
        });
    }

    /** @hidden */
    private _getItemsPerRow(activeElement: HTMLDivElement): number {
        const itemWidth = activeElement.getBoundingClientRect().width;
        const containerWidth = this._elRef.nativeElement.getBoundingClientRect().width;
        return Math.floor(containerWidth / itemWidth);
    }

    /** @hidden */
    private _updateGridListItemsProperties(components: QueryList<GridListItemComponent<T>>): void {
        const layoutPattern = this.layoutPattern ? this.layoutPattern : 'XL4-L3-M2-S1';
        const baseLayoutItemPattern = parseLayoutPattern(layoutPattern);

        components.forEach((component, index) => {
            if (component._index !== index) {
                component._index = index;
            }

            if (!component.selectionMode) {
                component.selectionMode = this.selectionMode;
            }

            if (!component.layoutItemPattern) {
                component.gridLayoutClasses = baseLayoutItemPattern;
            }
        });
    }

    /** @hidden */
    private _updateGridListItemsProperty(key: string, value: string | string[]): void {
        this._gridListItems.forEach((componenet) => {
            componenet[key] = value;
        });
    }
}
