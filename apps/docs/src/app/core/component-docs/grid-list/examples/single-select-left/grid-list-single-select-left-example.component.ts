import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GridListItemOutputEvent } from '@fundamental-ngx/core';

interface GridListItem {
    id: number;
    title: string;
    description: string;
    type?: string,
    counter?: number;
    selected?: boolean;
}

@Component({
    selector: 'fd-grid-list-single-select-left-example',
    templateUrl: './grid-list-single-select-left-example.component.html',
    styleUrls: ['./grid-list-single-select-left-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridListSingleSelectLeftExampleComponent {
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
            type: 'detail',
            counter: 5
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
            type: 'navigation'
        },
        {
            id: 7,
            title: 'Title 7',
            description: 'Description 7'
        }
    ];

    onSelectionChange(event: GridListItemOutputEvent<number>): void {
        console.log('Single Select Left: selected item', event);
    }

    press(event: GridListItemOutputEvent<number>): void {
        console.log('Press event', event);
    }

    detail(event: GridListItemOutputEvent<number>): void {
        console.log('Detail event', event);
    }

    navigate(event: GridListItemOutputEvent<number>): void {
        console.log('Navigation event', event);
    }
}
