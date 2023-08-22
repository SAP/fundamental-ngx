import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { GridListModule } from '@fundamental-ngx/core/grid-list';

@Component({
    selector: 'fd-grid-list-statuses-example',
    templateUrl: './grid-list-statuses-example.component.html',
    styleUrls: ['./grid-list-statuses-example.component.scss'],
    standalone: true,
    imports: [GridListModule, AvatarModule, LinkComponent, RouterLink]
})
export class GridListStatusesExampleComponent {}
