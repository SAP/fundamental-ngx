import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
    DescriptionComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    templateUrl: './tool-layout-header.component.html',
    styles: [
        `
            code {
                color: #00677f;
            }
        `
    ],
    imports: [HeaderComponent, DescriptionComponent, ImportComponent, HeaderTabsComponent, RouterOutlet]
})
export class ToolLayoutHeaderComponent {
    constructor() {}
}
