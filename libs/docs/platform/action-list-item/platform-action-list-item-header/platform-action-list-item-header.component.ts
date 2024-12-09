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
    selector: 'app-action-list-item-header',
    templateUrl: './platform-action-list-item-header.component.html',
    imports: [DocPageComponent, HeaderComponent, DescriptionComponent, RouterLink, ImportComponent, HeaderTabsComponent]
})
export class PlatformActionListItemHeaderComponent {}
