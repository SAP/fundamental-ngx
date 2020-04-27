import { Subject } from 'rxjs';
import { MenuKeyboardService } from '../menu/menu-keyboard.service';
import { Inject, Injectable } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { NestedItemInterface } from './nested-item/nested-item.interface';
import { NestedListInterface } from './nested-list/nested-list.interface';

/**
 * Nested list keyboard service, which uses MenuKeyboardService, to deal with ArrowUp, ArrowDown, Space, Enter.
 * Also has own handling of ArrowLeft and ArrowRight, to open/close the menu if it has any children.
 */
@Injectable()
export class NestedListKeyboardService {
    constructor(@Inject(MenuKeyboardService) private keyboardService: MenuKeyboardService) {}

    /**
     * Event, that is thrown always, when the open/close i being called on item components.
     * Also triggers changing of elements, to remove closed/hidden elements
     */
    readonly refresh$: Subject<void> = new Subject<void>();

    /** Recursive function to get all of the NestedItem elements in correct order. */
    private getItems(item: NestedItemInterface): NestedItemInterface[] {
        const childrenItems = item.expanded ? item.allChildrenItems : [];
        return childrenItems.reduce(
            (actualArray: NestedItemInterface[], nextItem: NestedItemInterface) => [
                ...actualArray,
                ...this.getItems(nextItem)
            ],
            [item]
        );
    }

    /**
     * Function called after refresh$ event is triggered.
     * Refresh the list of NestedItems, that the keyboard support should be provided for
     */
    public refreshItems(lists: NestedListInterface[]): void {
        const items: NestedItemInterface[] = [];

        /** Gathering all of the items */
        lists.forEach((list) => items.push(...this.getAllListItems(list)));
        /** Putting the keyboard support function to each of the items */
        items.forEach((item, index) => {
            item.keyboardTriggered
                .pipe(takeUntil(this.refresh$))
                .subscribe((keyboardEvent: KeyboardEvent) => this.handleKeyDown(keyboardEvent, index, items));
        });
    }

    /** Method that calls the recursive function, getItems() and gathers all of the items in the NestedList */
    private getAllListItems(list: NestedListInterface): NestedItemInterface[] {
        const _items: NestedItemInterface[] = [];
        if (list && list.nestedItems && list.nestedItems.length > 0) {
            list.nestedItems.forEach((item) => {
                _items.push(...this.getItems(item));
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
    private handleKeyDown(keyboardEvent: KeyboardEvent, index: number, items: NestedItemInterface[]): void {
        const item: NestedItemInterface = items[index];

        switch (keyboardEvent.key) {
            case 'ArrowRight': {
                if (!item.expanded && item.hasChildren) {
                    item.triggerOpen();
                } else {
                    if (items.length > index + 1) {
                        items[index + 1].focus();
                    } else {
                        items[0].focus();
                    }
                    keyboardEvent.preventDefault();
                }
                break;
            }

            case 'ArrowLeft': {
                if (item.expanded && item.hasChildren) {
                    item.triggerClose();
                } else {
                    if (index > 0) {
                        items[index - 1].focus();
                    } else {
                        items[items.length - 1].focus();
                    }
                    keyboardEvent.preventDefault();
                }
                break;
            }

            default: {
                this.keyboardService.keyDownHandler(keyboardEvent, index, items);
            }
        }
    }
}
