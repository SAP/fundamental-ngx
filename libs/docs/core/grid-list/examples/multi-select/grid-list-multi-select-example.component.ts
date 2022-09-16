import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation } from '@angular/core';

import {
    GridListComponent,
    GridListItemOutputEvent,
    GridListItemType,
    GridListSelectionEvent
} from '@fundamental-ngx/core/grid-list';

interface GridListItem {
    id: number;
    title: string;
    description: string;
    type?: GridListItemType;
    counter?: number;
    selected?: boolean;
}

@Component({
    selector: 'fd-grid-list-multi-select-example',
    templateUrl: './grid-list-multi-select-example.component.html',
    styleUrls: ['./grid-list-multi-select-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class GridListMultiSelectExampleComponent {
    @ViewChild(GridListComponent)
    grid: GridListComponent<GridListItem>;

    list: GridListItem[] = [
        {
            id: 1,
            title: 'Title 1',
            description: 'Description 1'
        },
        {
            id: 2,
            title: 'Title 2',
            description: 'Description 2',
            selected: true
        },
        {
            id: 3,
            title: 'Title 3',
            description: 'Description 3',
            type: 'active'
        },
        {
            id: 4,
            title: 'Title 4',
            description: 'Description 4',
            type: 'detail'
        },
        {
            id: 5,
            title: 'Title 5',
            description: 'Description 5',
            type: 'detailsAndActive'
        },
        {
            id: 6,
            title: 'Title 6',
            description: 'Description 6',
            type: 'navigation',
            counter: 5
        },
        {
            id: 7,
            title: 'Title 7',
            description: 'Description 7'
        }
    ];

    onSelectionChange(event: GridListSelectionEvent<number>): void {
        console.log('Multi-Select: selected items', event);
    }

    press(event: GridListItemOutputEvent<number>): void {
        console.log('Press event', event);
    }

    detail(event: GridListItemOutputEvent<number>): void {
        console.log('Detail event', event);
    }

    navigate(event: GridListItemOutputEvent<number>): void {
        alert('Navigation event value is: ' + event.value);
    }

    clearSelection(): void {
        this.grid.clearSelection();
    }
}
