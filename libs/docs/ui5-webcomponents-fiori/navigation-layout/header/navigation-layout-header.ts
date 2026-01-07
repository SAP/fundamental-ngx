import { Component, computed, signal } from '@angular/core';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'ui5-navigation-layout-header',
    templateUrl: './navigation-layout-header.html',
    imports: [DescriptionComponent, DocPageComponent, HeaderComponent, HeaderTabsComponent, ImportComponent]
})
export class NavigationLayoutHeader {
    readonly componentName = signal('NavigationLayout');
    readonly packageName = signal('@ui5/webcomponents-fiori');
    readonly displayName = computed(() => this.componentName());
    readonly packagePath = computed(() => this.packageName());
}
