import { Component } from '@angular/core';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'fd-flexible-column-layout-docs-header',
    templateUrl: './flexible-column-layout-docs-header.component.html',
    styles: [
        `
            code {
                color: red;
            }
        `
    ],
    imports: [DocPageComponent, HeaderComponent, DescriptionComponent, ImportComponent, HeaderTabsComponent]
})
export class FlexibleColumnLayoutDocsHeaderComponent {}
