import { Component, signal } from '@angular/core';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'ui5-expandable-text-header',
    templateUrl: './expandable-text-header.html',
    standalone: true,
    imports: [DocPageComponent, HeaderComponent, DescriptionComponent, ImportComponent, HeaderTabsComponent]
})
export class ExpandableTextHeader {
    readonly componentName = signal('ExpandableText');
    readonly packageName = signal('@ui5/webcomponents');
}
