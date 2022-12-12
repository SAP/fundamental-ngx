import { Subject } from 'rxjs';
import { MenuKeyboardService } from '@fundamental-ngx/core/menu';
import { Inject, Injectable, Optional } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { NestedItemInterface } from './nested-item/nested-item.interface';
import { NestedListInterface } from './nested-list/nested-list.interface';
import { KeyUtil, RtlService } from '@fundamental-ngx/core/utils';
import { LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';

/**
 * Nested list keyboard service, which uses MenuKeyboardService, to deal with ArrowUp, ArrowDown, Space, Enter.
 * Also has own handling of ArrowLeft and ArrowRight, to open/close the menu if it has any children.
 */
@Injectable()
export class NestedListKeyboardService {
    /** @hidden handles rtl service */
    private _dir: 'ltr' | 'rtl' | null = 'ltr';

    /**
     * Event, that is thrown always, when the open/close i being called on item components.
     * Also triggers changing of elements, to remove closed/hidden elements
     */
    readonly refresh$: Subject<void> = new Subject<void>();

    /** @hidden */
    constructor(
        @Inject(MenuKeyboardService) private keyboardService: MenuKeyboardService,
        @Optional() private _rtlService: RtlService | null
    ) {
        this._subscribeToRtl();
    }

    /**
     * Function called after refresh$ event is triggered.
     * Refresh the list of NestedItems, that the keyboard support should be provided for
     */
    refreshItems(lists: NestedListInterface[]): void {
        const items: NestedItemInterface[] = [];

        /** Gathering all of the items */
        lists.forEach((list) => items.push(...this._getAllListItems(list)));
        /** Putting the keyboard support function to each of the items */
        items.forEach((item, index) => {
            item.keyboardTriggered
                .pipe(takeUntil(this.refresh$))
                .subscribe((keyboardEvent: KeyboardEvent) => this._handleKeyDown(keyboardEvent, index, items));
        });
    }

    /** Recursive function to get all of the NestedItem elements in correct order. */
    private _getItems(item: NestedItemInterface): NestedItemInterface[] {
        const childrenItems = item.expanded ? item.allChildrenItems : [];
        return childrenItems.reduce(
            (actualArray: NestedItemInterface[], nextItem: NestedItemInterface) => [
                ...actualArray,
                ...this._getItems(nextItem)
            ],
            [item]
        );
    }

    /** Method that calls the recursive function, getItems() and gathers all of the items in the NestedList */
    private _getAllListItems(list: NestedListInterface): NestedItemInterface[] {
        const _items: NestedItemInterface[] = [];
        if (list && list.nestedItems && list.nestedItems.length > 0) {
            list.nestedItems.forEach((item) => {
                _items.push(...this._getItems(item));
            });
        }

        return _items;
    }

    /**
     * Keyboard handle function. Uses keyboard support service from MenuComponent, to deal with ArrowUp, ArrowDown, Space, Enter.
     * For ArrowRight, if item is not expanded and has children (list or popup), the open function is triggered.
     * Otherwise it follows ArrowDown functionality.
     * For ArrowLeft, if item is expanded and has children (list or popup), the close function is triggered.
     * Otherwise it follows ArrowUp functionality
     */
    private _handleKeyDown(keyboardEvent: KeyboardEvent, index: number, items: NestedItemInterface[]): void {
        const item: NestedItemInterface = items[index];

        if (
            (this._dir === 'ltr' && KeyUtil.isKeyCode(keyboardEvent, RIGHT_ARROW)) ||
            (this._dir === 'rtl' && KeyUtil.isKeyCode(keyboardEvent, LEFT_ARROW))
        ) {
            if (!item.expanded && item.hasChildren) {
                item.triggerOpen();
            }
            keyboardEvent.preventDefault();
        }

        if (
            (this._dir === 'ltr' && KeyUtil.isKeyCode(keyboardEvent, LEFT_ARROW)) ||
            (this._dir === 'rtl' && KeyUtil.isKeyCode(keyboardEvent, RIGHT_ARROW))
        ) {
            if (item.expanded && item.hasChildren) {
                item.triggerClose();
            }
            keyboardEvent.preventDefault();
        }

        this.keyboardService.keyDownHandler(keyboardEvent, index, items);
    }

    /** @hidden Rtl change subscription */
    private _subscribeToRtl(): void {
        if (!this._rtlService) {
            return;
        }

        this._rtlService.rtl.subscribe((isRtl) => {
            this._dir = isRtl ? 'rtl' : 'ltr';
        });
    }
}
