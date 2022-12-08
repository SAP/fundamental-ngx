import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

interface GridListItem {
    id: number;
    title: string;
    description: string;
    layoutItemPattern?: string;
}

@Component({
    selector: 'fd-grid-list-layout-example',
    templateUrl: './grid-list-layout-example.component.html',
    styleUrls: ['./grid-list-layout-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class GridListLayoutExampleComponent {
    layoutPattern = 'XL4-L3-M2-S1';

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
            layoutItemPattern: 'XL6-L8-M6-S12'
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
}
