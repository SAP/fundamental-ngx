import { Component } from '@angular/core';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-notification-docs-header',
    templateUrl: './notification-docs-header.component.html',
    styleUrls: ['./notification-docs-header.component.scss'],
    imports: [DocPageComponent, HeaderComponent, ImportComponent, DescriptionComponent, HeaderTabsComponent]
})
export class NotificationDocsHeaderComponent {}
