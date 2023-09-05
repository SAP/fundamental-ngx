import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { GridListItemOutputEvent, GridListModule } from '@fundamental-ngx/core/grid-list';
import { LinkComponent } from '@fundamental-ngx/core/link';

@Component({
    selector: 'fd-grid-list-states-example',
    templateUrl: './grid-list-states-example.component.html',
    styleUrls: ['./grid-list-states-example.component.scss'],
    standalone: true,
    imports: [GridListModule, AvatarModule, LinkComponent, RouterLink]
})
export class GridListStatesExampleComponent {
    locked(event: GridListItemOutputEvent<undefined>): void {
        console.log('Locked event', event);
    }

    draft(event: GridListItemOutputEvent<undefined>): void {
        console.log('Draft event', event);
    }
}
