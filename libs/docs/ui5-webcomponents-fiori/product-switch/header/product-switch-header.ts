import { Component, signal } from '@angular/core';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'ui5-product-switch-header',
    templateUrl: './product-switch-header.html',
    standalone: true,
    imports: [DocPageComponent, HeaderComponent, DescriptionComponent, ImportComponent, HeaderTabsComponent]
})
export class ProductSwitchHeader {
    componentName = signal('ProductSwitch');
    packageName = signal('@ui5/webcomponents-fiori');
}
