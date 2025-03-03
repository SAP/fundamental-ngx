import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FocusableItemDirective } from '@fundamental-ngx/cdk/utils';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import {
    GridListComponent,
    GridListItemOutputEvent,
    GridListItemType,
    GridListModule,
    GridListSelectionEvent
} from '@fundamental-ngx/core/grid-list';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { SegmentedButtonComponent } from '@fundamental-ngx/core/segmented-button';

interface GridListItem {
    id: number;
    title: string;
    description: string;
    type?: GridListItemType;
    counter?: number;
    selected?: boolean;
}

@Component({
    selector: 'fd-grid-list-combo-select-example',
    templateUrl: './grid-list-combo-select-example.component.html',
    styleUrls: ['./grid-list-combo-select-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [
        ButtonComponent,
        FormsModule,
        FocusableItemDirective,
        SegmentedButtonComponent,
        GridListModule,
        ContentDensityDirective,
        AvatarComponent,
        LinkComponent,
        RouterLink,
        GridListComponent
    ]
})
export class GridListComboSelectComponent {
    selectionMode: string = 'None';

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

    onSelectionChange(event: GridListSelectionEvent<number>): void {
        console.log('Multi-Select: selected items', event);
    }

    press(event: GridListItemOutputEvent<number>): void {
        console.log('Press event', event);
    }

    detail(event: GridListItemOutputEvent<number>): void {
        console.log('Detail event', event);
    }

    navigateGrid(event: GridListItemOutputEvent<number>): void {
        alert('Navigation event value is: ' + event.value);
    }

    clearSelection(): void {
        this.grid.clearSelection();
    }

    delete(event: GridListItemOutputEvent<number>): void {
        if (event.index !== null && event.index !== undefined) {
            this.list.splice(event.index, 1);
            alert('Deleted item event ' + event.value);
        }
    }

    onCardClick() {
        alert('Card clicked');
    }
}
