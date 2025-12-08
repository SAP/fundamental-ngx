import { Component, computed, signal } from '@angular/core';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'ui5-illustrated-message-header',
    templateUrl: './illustrated-message-header.html',
    imports: [DescriptionComponent, DocPageComponent, HeaderComponent, HeaderTabsComponent, ImportComponent]
})
export class IllustratedMessageHeader {
    readonly componentName = signal('IllustratedMessage');
    readonly packageName = signal('@ui5/webcomponents-fiori');
    readonly displayName = computed(() => this.componentName());
    readonly packagePath = computed(() => this.packageName());
}
