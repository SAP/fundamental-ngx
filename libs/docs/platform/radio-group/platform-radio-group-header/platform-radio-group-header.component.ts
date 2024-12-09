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
    selector: 'app-radio-group-header',
    templateUrl: './platform-radio-group-header.component.html',
    imports: [DocPageComponent, HeaderComponent, DescriptionComponent, RouterLink, ImportComponent, HeaderTabsComponent]
})
export class PlatformRadioGroupHeaderComponent {}
