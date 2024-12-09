import { Component } from '@angular/core';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-pagination-header',
    templateUrl: './pagination-header.component.html',
    styleUrls: ['./pagination-header.component.scss'],
    imports: [DocPageComponent, HeaderComponent, DescriptionComponent, ImportComponent, HeaderTabsComponent]
})
export class PaginationHeaderComponent {}
