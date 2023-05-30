import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, ViewEncapsulation } from '@angular/core';
import { DragoverPredicate, DropPredicate, FdDndDropEventMode, FdDropEvent, isOdd } from '@fundamental-ngx/cdk/utils';
import { delay, of } from 'rxjs';

@Component({
    selector: 'fd-dnd-disabled-example',
    templateUrl: './disabled-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['../../../../../cdk/src/lib/utils/drag-and-drop/drag-and-drop.scss'],
    styles: [
        `
            .fdk-sortable-list__item {
                --fdItemShift: 0rem;
                box-sizing: border-box;
                display: block;
                width: 20rem;
                max-width: 100%;
                background: var(--sapList_Background);
                padding: 1rem 0.8rem;
                padding-left: calc(0.8rem + var(--fdItemShift));
                border-bottom: var(--sapList_BorderWidth) solid var(--sapList_BorderColor);
            }

            .fdk-sortable-list__item.fd-dnd-on-drag {
                z-index: 10000;
                opacity: 0.9;
            }

            .fd-dnd-item--disabled {
                background-color: red;
            }
        `
    ]
})
export class DisabledExampleComponent {
    values = generateItems();
    private _cdr = inject(ChangeDetectorRef);

    dropMode: 'all' | 'none' | 'odd' = 'all';

    dragMode: 'all' | 'none' | 'odd' = 'all';

    simulateDelay = false;

    loading = false;

    dragoverPredicate: DragoverPredicate<ListItem> = (dragItem, dragOverItem, dragItemIndex, dragOverItemIndex) => {
        console.log(dragItem, dragOverItem, dragItemIndex, dragOverItemIndex);
        if (this.dragMode === 'all') {
            return true;
        }

        if (this.dragMode === 'none') {
            return false;
        }

        const odd = isOdd(dragItemIndex + 1);

        if (!odd || (odd && isOdd(dragOverItemIndex + 1))) {
            return true;
        }
        return false;
    };

    predicate: DropPredicate<ListItem> = (dragItem, dropItem, event) => {
        const resultFn = () => {
            if (this.dropMode === 'all') {
                return true;
            }
            if (this.dropMode === 'none') {
                return false;
            }

            if (isOdd(event.draggedItemIndex + 1) && isOdd(event.replacedItemIndex + 1)) {
                return true;
            }

            return false;
        };
        const result = resultFn();
        console.log(dragItem, dropItem, event);
        return this.simulateDelay ? of(result).pipe(delay(2000)) : result;
    };

    onPredicateCalculating(loading: boolean): void {
        this.loading = loading;
        this._cdr.detectChanges();
    }

    onItemDropped(event: FdDropEvent<ListItem>): void {
        const values = this.values as ListItem[];
        const draggedItem = values[event.draggedItemIndex];
        const droppedItem = values[event.replacedItemIndex];

        if (event.mode === 'group') {
            this._handleReplaceDropAction(draggedItem, droppedItem, event);
        } else {
            this._handleShiftDropAction(draggedItem, droppedItem, event);
        }

        this._dragDropUpdateDropItemAttributes(draggedItem, droppedItem, event.mode);

        this._cdr.detectChanges();
    }

    /** @hidden */
    private _handleShiftDropAction(dragItem: ListItem, dropItem: ListItem, event: FdDropEvent<ListItem>): void {
        const { allItems, itemsToMove, itemsAfterDropItem, dropItemItems } = this._getNewDragDropItemsPosition(
            dragItem,
            dropItem
        );

        this.values = [
            ...allItems,
            ...(event.insertAt === 'after' ? dropItemItems : []),
            ...itemsToMove,
            ...(event.insertAt === 'after' ? [] : dropItemItems),
            ...itemsAfterDropItem
        ];
    }

    /** @hidden */
    private _handleReplaceDropAction(dragItem: ListItem, dropItem: ListItem, event: FdDropEvent<ListItem>): void {
        const { allItems, itemsToMove, itemsAfterDropItem, dropItemItems } = this._getNewDragDropItemsPosition(
            dragItem,
            dropItem
        );

        this.values = [...allItems, ...dropItemItems, ...itemsToMove, ...itemsAfterDropItem];
    }

    private _createGroup(event: FdDropEvent<ListItem>): ListItem[] {
        const items = this.values as ListItem[];
        const droppedItem = items[event.draggedItemIndex];
        const droppedOnItem = items[event.replacedItemIndex];
        droppedItem.parent = droppedOnItem;
        droppedOnItem.children.push(droppedItem);

        return items;
    }

    private _getNewDragDropItemsPosition(dragItem: ListItem, dropItem: ListItem): UpdatedDndItemsPosition {
        const allItems = this.values;

        const dragItemIndex = allItems.findIndex((item) => item === dragItem);
        const dragItemChildren = this._findItemChildren(dragItem);

        const itemsToMove = allItems.splice(dragItemIndex, dragItemChildren.length + 1);

        const dropItemIndex = allItems.findIndex((item) => item === dropItem);
        const dropItemChildren = this._findItemChildren(dropItem);

        const dropItemItemsLength = dropItemChildren.length + 1;

        const itemsAfterDropItem = allItems.splice(
            dropItemIndex + dropItemItemsLength,
            allItems.length + dropItemItemsLength
        );
        const dropItemItems = allItems.splice(dropItemIndex, dropItemItemsLength);

        return {
            allItems,
            itemsToMove,
            itemsAfterDropItem,
            dropItemItems
        };
    }

    /** @hidden */
    private _findItemChildren(item: ListItem): ListItem[] {
        const allItems = this.values;
        const itemsLength = allItems.length;

        /**
         * Since we are dealing with a flat list
         * it means all children go next right after the expandable item
         * until the next item has a mutual parent
         */

        let index = allItems.indexOf(item);
        const parents = this._getItemParents(item);
        const children: ListItem[] = [];

        while (index++ < itemsLength) {
            const nextItem = allItems[index];
            if (!nextItem?.parent || parents.includes(nextItem.parent)) {
                break;
            }
            children.push(nextItem);
        }

        return children;
    }

    private _getItemParents(item: ListItem): ListItem[] {
        const parents: ListItem[] = [];
        let parent = item.parent || null;
        while (parent && parent !== null) {
            parents.push(parent);
            parent = parent.parent || null;
        }
        return parents;
    }

    private _dragDropUpdateDropItemAttributes(dragItem: ListItem, dropItem: ListItem, mode: FdDndDropEventMode): void {
        if (dragItem.parent) {
            // Remove child item from previous parent item.
            dragItem.parent.children.splice(dragItem.parent.children.indexOf(dragItem), 1);
        }
        dragItem.level = dropItem.level + (mode === 'group' ? 1 : 0);

        if (mode === 'group') {
            dragItem.parent = dropItem;
            dropItem.children.push(dragItem);
        } else {
            dragItem.parent = dropItem.parent;
            dropItem.parent?.children.push(dragItem);
        }

        const children = this._findItemChildren(dragItem);
        children.forEach((item) => {
            item.level = this._getItemParents(item).length;
        });
    }
}

interface UpdatedDndItemsPosition {
    allItems: ListItem[];
    itemsToMove: ListItem[];
    itemsAfterDropItem: ListItem[];
    dropItemItems: ListItem[];
}

interface ListItem {
    name: string;
    parent: null | ListItem;
    level: number;
    children: ListItem[];
}

const generateItems = (length = 10): ListItem[] =>
    Array.from(Array(length)).map(
        (_, index): ListItem => ({
            name: `List item ${index + 1}`,
            parent: null,
            children: [],
            level: 0
        })
    );
