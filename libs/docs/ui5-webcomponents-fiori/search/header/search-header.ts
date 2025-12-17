import { Component, signal } from '@angular/core';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'ui5-search-header',
    templateUrl: './search-header.html',
    standalone: true,
    imports: [DocPageComponent, HeaderComponent, DescriptionComponent, ImportComponent, HeaderTabsComponent]
})
export class SearchHeader {
    componentName = signal('Search');
    packageName = signal('@ui5/webcomponents-fiori');
}
