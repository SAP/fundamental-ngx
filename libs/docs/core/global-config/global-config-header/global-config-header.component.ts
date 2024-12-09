import { Component } from '@angular/core';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'fd-global-config-header',
    templateUrl: './global-config-header.component.html',
    imports: [DocPageComponent, HeaderComponent, DescriptionComponent, HeaderTabsComponent]
})
export class GlobalConfigHeaderComponent {}
