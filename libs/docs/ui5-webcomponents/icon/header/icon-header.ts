import { Component, computed, signal } from '@angular/core';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'ui5-icon-header',
    templateUrl: './icon-header.html',
    standalone: true,
    imports: [DocPageComponent, HeaderComponent, DescriptionComponent, ImportComponent, HeaderTabsComponent]
})
export class IconHeader {
    readonly componentName = signal('Icon');
    readonly packageName = signal('@ui5/webcomponents');

    readonly displayName = computed(() => this.componentName());
    readonly packagePath = computed(() => this.packageName());
}
