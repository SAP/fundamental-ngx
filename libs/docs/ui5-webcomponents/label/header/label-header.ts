import { Component, computed, signal } from '@angular/core';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'ui5-label-header',
    templateUrl: './label-header.html',
    standalone: true,
    imports: [DocPageComponent, HeaderComponent, DescriptionComponent, ImportComponent, HeaderTabsComponent]
})
export class LabelHeader {
    // Using Angular 20 signals for reactive component properties
    readonly componentName = signal('Label');
    readonly packageName = signal('@ui5/webcomponents');

    // Computed values for template binding (Angular 20 feature)
    readonly displayName = computed(() => this.componentName());
    readonly packagePath = computed(() => this.packageName());
}
