import { Component, computed, signal } from '@angular/core';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'ui5-timeline-header',
    templateUrl: './timeline-header.html',
    standalone: true,
    imports: [DocPageComponent, HeaderComponent, DescriptionComponent, ImportComponent, HeaderTabsComponent]
})
export class TimelineHeader {
    // Using Angular 20 signals for reactive component properties
    readonly componentName = signal('Timeline');
    readonly packageName = signal('@ui5/webcomponents-fiori');

    // Computed properties using Angular 20 computed signals
    readonly displayName = computed(() => this.componentName());
    readonly packagePath = computed(() => this.packageName());
}
