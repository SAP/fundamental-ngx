import { Component, computed, signal } from '@angular/core';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'ui5-flexible-column-layout-header',
    templateUrl: './flexible-column-layout-header.html',
    imports: [DescriptionComponent, DocPageComponent, HeaderComponent, HeaderTabsComponent, ImportComponent]
})
export class FlexibleColumnLayoutHeader {
    readonly componentName = signal('FlexibleColumnLayout');
    readonly packageName = signal('@ui5/webcomponents-fiori');
    readonly displayName = computed(() => this.componentName());
    readonly packagePath = computed(() => this.packageName());
}
