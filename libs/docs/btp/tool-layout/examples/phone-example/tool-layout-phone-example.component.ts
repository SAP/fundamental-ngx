import { Component } from '@angular/core';
import {
    ToolLayoutComponent,
    ToolLayoutContainerDirective,
    ToolLayoutContentContainerDirective,
    ToolLayoutHeaderContainerDirective
} from '@fundamental-ngx/btp/tool-layout';

@Component({
    selector: 'fdb-tool-layout-phone-example',
    templateUrl: './tool-layout-phone-example.component.html',
    imports: [
        ToolLayoutComponent,
        ToolLayoutContainerDirective,
        ToolLayoutContentContainerDirective,
        ToolLayoutHeaderContainerDirective
    ]
})
export class ToolLayoutPhoneExampleComponent {}
