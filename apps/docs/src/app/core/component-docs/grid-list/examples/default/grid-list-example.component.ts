import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GridListItemOutputEvent } from '@fundamental-ngx/core';
import { GridListItem } from '../grid-list-item.interface';
@Component({
    selector: 'fd-grid-list-default-example',
    templateUrl: './grid-list-example.component.html',
    styleUrls: ['../grid-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
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

    navigate(event: GridListItemOutputEvent<undefined>): void {
        console.log('Navigation event', event);
    }
}
