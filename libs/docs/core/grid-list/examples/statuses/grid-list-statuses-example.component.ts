import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { GridListModule } from '@fundamental-ngx/core/grid-list';
import { LinkComponent } from '@fundamental-ngx/core/link';

@Component({
    selector: 'fd-grid-list-statuses-example',
    templateUrl: './grid-list-statuses-example.component.html',
    styleUrls: ['./grid-list-statuses-example.component.scss'],
    imports: [GridListModule, AvatarComponent, LinkComponent, RouterLink]
})
export class GridListStatusesExampleComponent {}
