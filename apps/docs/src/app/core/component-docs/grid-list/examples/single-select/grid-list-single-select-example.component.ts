import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GridListItemOutputEvent } from '@fundamental-ngx/core';

interface GridListItem {
    id: number;
    url: string;
    type?: string,
    toolbarText?: string;
    selected?: boolean;
    counter?: number;
}

@Component({
    selector: 'fd-grid-list-single-select-example',
    templateUrl: './grid-list-single-select-example.component.html',
    styleUrls: ['./grid-list-single-select-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridListSingleSelectExampleComponent {
    list: GridListItem[] = [
        {
            id: 1,
            type: 'detailsAndActive',
            url: 'https://picsum.photos/id/1000/300/200',
            toolbarText: 'Custom Text'
        },
        {
            id: 2,
            selected: true,
            toolbarText: 'Custom Text',
            type: 'navigation',
            counter: 8,
            url: 'https://picsum.photos/id/1001/300/200'
        },
        {
            id: 3,
            type: 'active',
            toolbarText: 'Custom Text',
            url: 'https://picsum.photos/id/1002/300/200'
        },
        {
            id: 4,
            type: 'detail',
            toolbarText: 'Custom Text',
            url: 'https://picsum.photos/id/1003/300/200'
        },
        {
            id: 5,
            url: 'https://picsum.photos/id/1004/300/200'
        },
        {
            id: 6,
            url: 'https://picsum.photos/id/1005/300/200'
        },
        {
            id: 7,
            url: 'https://picsum.photos/id/1006/300/200'
        }
    ];

    onSelectionChange(event: GridListItemOutputEvent<number>): void {
        console.log('Single Select: selected item', event);
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
