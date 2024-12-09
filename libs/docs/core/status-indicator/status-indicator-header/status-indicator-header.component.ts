import { Component } from '@angular/core';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'fd-status-indicator-header',
    templateUrl: './status-indicator-header.component.html',
    imports: [DocPageComponent, HeaderComponent, DescriptionComponent, ImportComponent, HeaderTabsComponent]
})
export class StatusIndicatorHeaderComponent {}
