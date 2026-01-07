import { Component, computed, signal } from '@angular/core';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'ui5-dynamic-page-header',
    templateUrl: './dynamic-page-header.html',
    standalone: true,
    imports: [DocPageComponent, HeaderComponent, DescriptionComponent, ImportComponent, HeaderTabsComponent]
})
export class DynamicPageHeader {
    readonly componentName = signal('DynamicPage');
    readonly packageName = signal('@ui5/webcomponents-fiori');
    readonly displayName = computed(() => this.componentName());
    readonly packagePath = computed(() => this.packageName());
}
