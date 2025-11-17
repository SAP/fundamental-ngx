import { Component, signal } from '@angular/core';
import { MovePlacement } from '@fundamental-ngx/ui5-webcomponents-base/types';
import { List, ListMoveEventDetail } from '@fundamental-ngx/ui5-webcomponents/list';
import { ListItemStandard } from '@fundamental-ngx/ui5-webcomponents/list-item-standard';

// Import the icon used in this example
import '@ui5/webcomponents-icons/dist/checklist-item.js';

@Component({
    selector: 'ui5-list-drag-and-drop-example',
    templateUrl: './drag-and-drop.html',
    standalone: true,
    imports: [List, ListItemStandard]
})
export class ListDragAndDropExample {
    readonly items = signal(['Item #1', 'Item #2', 'Item #3', 'Item #4']);

    onItemMove(event: CustomEvent<ListMoveEventDetail>): void {
        const { destination, source } = event.detail;

        switch (destination.placement) {
            case MovePlacement.Before:
                destination.element.before(source.element);
                break;
            case MovePlacement.After:
                destination.element.after(source.element);
                break;
            case MovePlacement.On:
                destination.element.prepend(source.element);
                break;
        }
    }

    onItemMoveOver(event: CustomEvent<ListMoveEventDetail>): void {
        const { source } = event.detail;

        if (!(event.target as HTMLElement).contains(source.element)) {
            return;
        }

        this.handleBeforeItemMove(event);
    }

    private handleBeforeItemMove(event: CustomEvent<ListMoveEventDetail>): void {
        const { destination } = event.detail;

        if (destination.placement === 'Before' || destination.placement === 'After') {
            event.preventDefault();
        }
    }
}
