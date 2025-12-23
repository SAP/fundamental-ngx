import { Component, signal } from '@angular/core';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'ui5-side-navigation-header',
    templateUrl: './side-navigation-header.html',
    standalone: true,
    imports: [DocPageComponent, HeaderComponent, DescriptionComponent, ImportComponent, HeaderTabsComponent]
})
export class SideNavigationHeader {
    componentName = signal('SideNavigation');
    packageName = signal('@ui5/webcomponents-fiori');
}
