import { Component, computed, signal } from '@angular/core';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'ui5-table-header',
    templateUrl: './table-header.html',
    standalone: true,
    imports: [DocPageComponent, HeaderComponent, DescriptionComponent, ImportComponent, HeaderTabsComponent]
})
export class TableHeader {
    readonly componentName = signal('Table');
    readonly packageName = signal('@ui5/webcomponents');

    readonly displayName = computed(() => this.componentName());
    readonly packagePath = computed(() => this.packageName());
}
