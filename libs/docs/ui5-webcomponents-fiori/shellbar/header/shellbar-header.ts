import { Component, signal } from '@angular/core';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'ui5-shellbar-header',
    templateUrl: './shellbar-header.html',
    standalone: true,
    imports: [DocPageComponent, HeaderComponent, DescriptionComponent, ImportComponent, HeaderTabsComponent]
})
export class ShellBarHeader {
    componentName = signal('ShellBar');
    packageName = signal('@ui5/webcomponents-fiori');
}
