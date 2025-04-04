import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-standard-list-item-header',
    templateUrl: './platform-standard-list-item-header.component.html',
    imports: [DocPageComponent, HeaderComponent, DescriptionComponent, RouterLink, ImportComponent, HeaderTabsComponent]
})
export class PlatformStandardListItemHeaderComponent {}
