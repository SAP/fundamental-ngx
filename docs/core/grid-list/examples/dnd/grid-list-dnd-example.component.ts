import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { GridListItemOutputEvent } from '@fundamental-ngx/core/grid-list';
import { FdDropEvent } from '@fundamental-ngx/cdk/utils';

interface GridListItem {
    id: number;
    title: string;
    description: string;
}

@Component({
    selector: 'fd-grid-list-dnd-example',
    templateUrl: './grid-list-dnd-example.component.html',
    styleUrls: ['./grid-list-dnd-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class GridListDndExampleComponent {
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

    itemsChangeHandle(dropEvent: FdDropEvent<any>): void {
        console.log('Drag and drop event: ', dropEvent);
        this.list = dropEvent.items;
    }

    showAlert(message: string): void {
        alert('Clicked on ' + message);
    }

    navigate(event: GridListItemOutputEvent<number>): void {
        alert('Navigation event value is: ' + event.value);
    }
}
