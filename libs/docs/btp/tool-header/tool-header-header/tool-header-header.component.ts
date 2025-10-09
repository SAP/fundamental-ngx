import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageStripComponent } from '@fundamental-ngx/core/message-strip';
import {
    DescriptionComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    templateUrl: './tool-header-header.component.html',
    imports: [
        HeaderComponent,
        DescriptionComponent,
        ImportComponent,
        HeaderTabsComponent,
        RouterOutlet,
        MessageStripComponent
    ]
})
export class ToolHeaderHeaderComponent {
    constructor() {}
}
