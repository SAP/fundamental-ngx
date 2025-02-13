import { Component } from '@angular/core';
import {
    ToolLayoutComponent,
    ToolLayoutContainerDirective,
    ToolLayoutContentContainerDirective,
    ToolLayoutHeaderContainerDirective,
    ToolLayoutNavigationContainerDirective
} from '@fundamental-ngx/btp/tool-layout';

@Component({
    selector: 'fdb-tool-layout-basic-example',
    templateUrl: './tool-layout-basic-example.component.html',
    imports: [
        ToolLayoutComponent,
        ToolLayoutContainerDirective,
        ToolLayoutContentContainerDirective,
        ToolLayoutHeaderContainerDirective,
        ToolLayoutNavigationContainerDirective
    ]
})
export class ToolLayoutBasicExampleComponent {}
