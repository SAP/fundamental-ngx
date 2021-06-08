import { Component } from '@angular/core';
import { GridListItemOutputEvent } from '@fundamental-ngx/core/grid-list';

@Component({
    selector: 'fd-grid-list-states-example',
    templateUrl: './grid-list-states-example.component.html',
    styleUrls: ['./grid-list-states-example.component.scss']
})
export class GridListStatesExampleComponent {
    locked(event: GridListItemOutputEvent<undefined>): void {
        console.log('Locked event', event);
    }

    draft(event: GridListItemOutputEvent<undefined>): void {
        console.log('Draft event', event);
    }
}
