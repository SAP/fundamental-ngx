import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
    DescriptionComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    templateUrl: './breakpoint-header.component.html',
    imports: [HeaderComponent, DescriptionComponent, ImportComponent, HeaderTabsComponent, RouterOutlet]
})
export class BreakpointHeaderComponent {
    falseSignal = signal(false);

    constructor() {}
}
