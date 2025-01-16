import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { GridListItemOutputEvent, GridListModule } from '@fundamental-ngx/core/grid-list';
import { LinkComponent } from '@fundamental-ngx/core/link';

@Component({
    selector: 'fd-grid-list-states-example',
    templateUrl: './grid-list-states-example.component.html',
    styleUrls: ['./grid-list-states-example.component.scss'],
    imports: [GridListModule, AvatarComponent, LinkComponent, RouterLink]
})
export class GridListStatesExampleComponent {
    locked(event: GridListItemOutputEvent<undefined>): void {
        console.log('Locked event', event);
    }

    draft(event: GridListItemOutputEvent<undefined>): void {
        console.log('Draft event', event);
    }
}
