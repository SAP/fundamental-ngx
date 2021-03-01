import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

interface GridListItem {
    id: number;
    title: string;
    description: string;
}

@Component({
    selector: 'fd-grid-list-group-example',
    templateUrl: './grid-list-group-example.component.html',
    styleUrls: ['./grid-list-group-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class GridListGroupExampleComponent {
    group1: GridListItem[] = [
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
        }
    ];

    group2: GridListItem[] = [
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

    showFilterBur = true;

    close(): void {
        this.showFilterBur = false;
    }
}
