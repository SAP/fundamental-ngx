import { Component, computed, signal } from '@angular/core';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'ui5-multi-combobox-header',
    templateUrl: './multi-combobox-header.html',
    standalone: true,
    imports: [DocPageComponent, HeaderComponent, DescriptionComponent, ImportComponent, HeaderTabsComponent]
})
export class MultiComboBoxHeader {
    readonly componentName = signal('MultiComboBox');
    readonly packageName = signal('@ui5/webcomponents');

    readonly displayName = computed(() => this.componentName());
    readonly packagePath = computed(() => this.packageName());
}
