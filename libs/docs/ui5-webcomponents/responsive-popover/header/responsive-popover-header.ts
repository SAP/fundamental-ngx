import { Component } from '@angular/core';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'ui5-responsive-popover-header',
    templateUrl: './responsive-popover-header.html',
    standalone: true,
    imports: [DocPageComponent, HeaderComponent, DescriptionComponent, ImportComponent, HeaderTabsComponent]
})
export class ResponsivePopoverHeader {
    componentName = 'ResponsivePopover';
    packageName = '@ui5/webcomponents';
}
