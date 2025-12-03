import { Component } from '@angular/core';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'ui5-dynamic-date-range-header',
    templateUrl: './dynamic-date-range-header.html',
    standalone: true,
    imports: [DocPageComponent, HeaderComponent, DescriptionComponent, ImportComponent, HeaderTabsComponent]
})
export class DynamicDateRangeHeader {
    componentName = 'DynamicDateRange';
    packageName = '@ui5/webcomponents';
}
