import { Component } from '@angular/core';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'ui5-select-header',
    templateUrl: './select-header.html',
    standalone: true,
    imports: [DocPageComponent, HeaderComponent, DescriptionComponent, ImportComponent, HeaderTabsComponent]
})
export class SelectHeader {
    componentName = 'Select';
    packageName = '@ui5/webcomponents';
}
