import { Component } from '@angular/core';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'ui5-breadcrumbs-header',
    templateUrl: './breadcrumbs-header.html',
    standalone: true,
    imports: [DocPageComponent, HeaderComponent, DescriptionComponent, ImportComponent, HeaderTabsComponent]
})
export class BreadcrumbsHeader {
    componentName = 'Breadcrumbs';
    packageName = '@ui5/webcomponents';
}
