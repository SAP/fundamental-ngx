import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { GridListItemOutputEvent } from '@fundamental-ngx/core/grid-list';

interface GridListItem {
    id: number;
    title: string;
    description: string;
}

@Component({
    selector: 'fd-grid-list-delete-example',
    templateUrl: './grid-list-delete-example.component.html',
    styleUrls: ['./grid-list-delete-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class GridListDeleteExampleComponent {
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
            description: 'Description 3'
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
        },
        {
            id: 7,
            title: 'Title 7',
            description: 'Description 7'
        }
    ];

    delete(event: GridListItemOutputEvent<number>): void {
        if (event.index !== null && event.index !== undefined) {
            this.list.splice(event.index, 1);
            alert('Deleted item event ' + event.value);
        }
    }
}
