import { Component } from '@angular/core';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-panel-docs-header',
    templateUrl: './panel-docs-header.component.html',
    styleUrls: ['./panel-docs-header.component.scss'],
    imports: [DocPageComponent, HeaderComponent, DescriptionComponent, ImportComponent, HeaderTabsComponent]
})
export class PanelDocsHeaderComponent {}
