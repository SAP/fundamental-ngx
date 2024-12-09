import { Component } from '@angular/core';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-facet-header',
    templateUrl: './facet-header.component.html',
    imports: [DocPageComponent, HeaderComponent, DescriptionComponent, ImportComponent, HeaderTabsComponent]
})
export class FacetDocsHeaderComponent {}
