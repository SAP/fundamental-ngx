import { Component, ElementRef, QueryList, signal, ViewChild, ViewChildren } from '@angular/core';
import { MovePlacement } from '@fundamental-ngx/ui5-webcomponents-base/types';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { List } from '@fundamental-ngx/ui5-webcomponents/list';
import { ListItemStandard } from '@fundamental-ngx/ui5-webcomponents/list-item-standard';
import { Text } from '@fundamental-ngx/ui5-webcomponents/text';

// Import drag-and-drop functionality from UI5 Web Components
import { startMultipleDrag } from '@ui5/webcomponents-base/dist/DragAndDrop.js';
import { default as _List } from '@ui5/webcomponents/dist/List.js';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';
import 'fundamental-styles/dist/paddings.css';

@Component({
    selector: 'ui5-list-multiple-drag-and-drop-example',
    templateUrl: './multiple-drag-and-drop.html',
    standalone: true,
    imports: [List, ListItemStandard, Label, Text]
})
export class ListMultipleDragAndDropExample {
    list1Items = signal<any[]>([
        { id: '1', text: 'Review design mockups', icon: 'task' },
        { id: '2', text: 'Update documentation', icon: 'task' },
        { id: '3', text: 'Fix bug #123', icon: 'task' },
        { id: '4', text: 'Prepare demo', icon: 'task' },
        { id: '5', text: 'Test new feature', icon: 'task' }
    ]);

    list2Items = signal<any[]>([
        { id: '6', text: 'Write unit tests', icon: 'accept' },
        { id: '7', text: 'Code review', icon: 'accept' }
    ]);

    list1SelectedCount = signal(0);
    list2SelectedCount = signal(0);

    @ViewChild('list1', { static: true, read: ElementRef })
    private readonly list1: ElementRef<_List>;

    @ViewChild('list2', { static: true, read: ElementRef })
    private readonly list2: ElementRef<_List>;

    @ViewChildren(ListItemStandard, { read: ElementRef })
    private readonly allListItems: QueryList<ElementRef<HTMLElement>>;

    onDragStart(event: DragEvent, listIndex: 1 | 2): void {
        const listElement = listIndex === 1 ? this.list1 : this.list2;
        if (!listElement) {
            return;
        }

        const draggedItem = event.target as any;
        const selectedItems = this.getSelectedItems(listElement.nativeElement);

        // If dragged item is not selected, select only it
        if (!draggedItem.selected) {
            selectedItems.forEach((item: any) => (item.selected = false));
            draggedItem.selected = true;
        }

        const currentSelected = this.getSelectedItems(listElement.nativeElement);

        // Start multiple drag if more than one item is selected
        if (currentSelected.length > 1) {
            startMultipleDrag(currentSelected.length, event);
        }
    }

    onItemMoveOver(event: CustomEvent): void {
        const { source, destination } = event.detail;

        // Allow drops from both lists
        const sourceList = source.element.closest('ui5-list');
        const list1El = this.list1;
        const list2El = this.list2;

        if (sourceList === list1El.nativeElement || sourceList === list2El.nativeElement) {
            // Allow reordering within lists and cross-list moves
            if (destination.placement === MovePlacement.Before || destination.placement === MovePlacement.After) {
                event.preventDefault();
            }
        }
    }

    onItemMove(event: CustomEvent): void {
        const { source, destination } = event.detail;

        // Get the source list to find all selected items
        const sourceList = source.element.closest('ui5-list');
        const selectedItems = this.getSelectedItems(sourceList);

        // Determine which items to move: all selected items or just the dragged item
        const itemsToMove =
            selectedItems.length > 1 && selectedItems.includes(source.element) ? selectedItems : [source.element];

        // Move the items using spread operator
        switch (destination.placement) {
            case MovePlacement.Before:
                destination.element.before(...itemsToMove);
                break;
            case MovePlacement.After:
                destination.element.after(...itemsToMove);
                break;
            case MovePlacement.On:
                destination.element.prepend(...itemsToMove);
                break;
        }

        // Update counts after move
        this.updateSelectionCount(1);
        this.updateSelectionCount(2);
    }

    onSelectionChange(listIndex: 1 | 2): void {
        this.updateSelectionCount(listIndex);
    }

    private updateSelectionCount(listIndex: 1 | 2): void {
        const listElement = listIndex === 1 ? this.list1?.nativeElement : this.list2?.nativeElement;
        if (!listElement) {
            return;
        }

        const selectedItems = this.getSelectedItems(listElement);
        const count = selectedItems.length;

        if (listIndex === 1) {
            this.list1SelectedCount.set(count);
        } else {
            this.list2SelectedCount.set(count);
        }
    }

    private getSelectedItems(listElement: HTMLElement): Element[] {
        const listItemsInThisList = this.allListItems.filter((item) => listElement.contains(item.nativeElement));
        return listItemsInThisList.map((item) => item.nativeElement).filter((item: any) => item.selected);
    }
}
