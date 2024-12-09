import { Component } from '@angular/core';
import { InfoLabelModule } from '@fundamental-ngx/core/info-label';
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
        InfoLabelModule,
        DescriptionComponent,
        ImportComponent,
        HeaderTabsComponent
    ]
})
export class ResizableCardLayoutDocsHeaderComponent {}
