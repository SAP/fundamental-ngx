import { ChangeDetectionStrategy, Component, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';

import { RouterLink } from '@angular/router';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import {
    GridListItemComponent,
    GridListItemOutputEvent,
    GridListItemType,
    GridListModule
} from '@fundamental-ngx/core/grid-list';
import { LinkComponent } from '@fundamental-ngx/core/link';

interface GridListItem {
    id: number;
    title: string;
    description: string;
    type?: GridListItemType;
    counter?: number;
}

@Component({
    selector: 'fd-grid-list-focusing-example',
    templateUrl: './grid-list-focusing-example.component.html',
    styleUrls: ['./grid-list-focusing-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [GridListModule, ButtonComponent, ContentDensityDirective, AvatarComponent, LinkComponent, RouterLink]
})
export class GridListFocusingItemExampleComponent {
    @ViewChildren(GridListItemComponent)
    gridListItems: QueryList<GridListItemComponent<GridListItem>>;

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
        alert('Navigation event');
        console.log(event);
    }

    showAlert(message: string): void {
        alert('Clicked on ' + message);
    }

    focusFirst(): void {
        this.gridListItems.first?.focus();
    }

    focusLast(): void {
        this.gridListItems.last?.focus();
    }
}
