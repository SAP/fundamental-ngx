import { Component } from '@angular/core';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-multi-input-header',
    templateUrl: './multi-input-header.component.html',
    styleUrls: ['./multi-input-header.component.scss'],
    imports: [DocPageComponent, HeaderComponent, DescriptionComponent, ImportComponent, HeaderTabsComponent]
})
export class MultiInputHeaderComponent {}
