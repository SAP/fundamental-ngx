import { Component } from '@angular/core';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'ui5-split-button-header',
    templateUrl: './split-button-header.html',
    standalone: true,
    imports: [DocPageComponent, HeaderComponent, DescriptionComponent, ImportComponent, HeaderTabsComponent]
})
export class SplitButtonHeader {
    componentName = 'SplitButton';
    packageName = '@ui5/webcomponents';
}
