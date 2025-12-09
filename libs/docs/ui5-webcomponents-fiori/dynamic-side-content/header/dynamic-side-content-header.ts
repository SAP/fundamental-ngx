import { Component, computed, signal } from '@angular/core';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'ui5-dynamic-side-content-header',
    templateUrl: './dynamic-side-content-header.html',
    imports: [DocPageComponent, HeaderComponent, DescriptionComponent, ImportComponent, HeaderTabsComponent]
})
export class DynamicSideContentHeader {
    readonly componentName = signal('DynamicSideContent');
    readonly packageName = signal('@ui5/webcomponents-fiori');
    readonly displayName = computed(() => this.componentName());
    readonly packagePath = computed(() => this.packageName());
}
