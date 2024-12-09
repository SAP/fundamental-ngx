import { Component } from '@angular/core';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-infinite-scroll-header',
    templateUrl: './infinite-scroll-header.component.html',
    styleUrls: ['./infinite-scroll-header.component.scss'],
    imports: [DocPageComponent, HeaderComponent, DescriptionComponent, ImportComponent, HeaderTabsComponent]
})
export class InfiniteScrollHeaderComponent {}
