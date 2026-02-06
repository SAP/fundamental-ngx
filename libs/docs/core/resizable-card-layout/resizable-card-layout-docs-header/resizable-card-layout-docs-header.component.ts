import { Component } from '@angular/core';
import { InfoLabelComponent } from '@fundamental-ngx/core/info-label';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-resizable-card-layout-docs-header',
    templateUrl: './resizable-card-layout-docs-header.component.html',
    imports: [
        DocPageComponent,
        HeaderComponent,
        InfoLabelComponent,
        DescriptionComponent,
        ImportComponent,
        HeaderTabsComponent
    ]
})
export class ResizableCardLayoutDocsHeaderComponent {}
