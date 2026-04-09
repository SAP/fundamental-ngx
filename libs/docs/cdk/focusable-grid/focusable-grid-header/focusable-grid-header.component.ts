import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
    DescriptionComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'fd-docs-cdk-focusable-grid-header',
    templateUrl: './focusable-grid-header.component.html',
    imports: [HeaderComponent, DescriptionComponent, ImportComponent, HeaderTabsComponent, RouterOutlet]
})
export class FocusableGridHeaderComponent {
    falseSignal = signal(false);
}
