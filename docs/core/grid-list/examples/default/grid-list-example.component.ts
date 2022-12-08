import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { GridListItemType } from '@fundamental-ngx/core/grid-list';

interface GridListItem {
    id: number;
    title: string;
    description: string;
    type?: GridListItemType;
    counter?: number;
}

@Component({
    selector: 'fd-grid-list-default-example',
    templateUrl: './grid-list-example.component.html',
    styleUrls: ['./grid-list-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class GridListDefaultExampleComponent {
    list: GridListItem[] = [
        {
            id: 1,
            title: 'Title 1',
            description: 'Description 1'
        },
        {
            id: 2,
            title: 'Title 2',
            description: 'Description 2'
        },
        {
            id: 3,
            title: 'Title 3',
            description: 'Description 3',
            type: 'navigation',
            counter: 15
        },
        {
            id: 4,
            title: 'Title 4',
            description: 'Description 4'
        },
        {
            id: 5,
            title: 'Title 5',
            description: 'Description 5'
        },
        {
            id: 6,
            title: 'Title 6',
            description: 'Description 6'
        }
    ];

    navigate(): void {
        alert('Navigation event');
    }

    showAlert(message: string): void {
        alert('Clicked on ' + message);
    }
}
