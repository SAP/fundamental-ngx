import { Component } from '@angular/core';
import {
    ToolLayoutContainerDirective,
    ToolLayoutContentContainerDirective,
    ToolLayoutDirective,
    ToolLayoutHeaderContainerDirective,
    ToolLayoutNavigationContainerDirective
} from '@fundamental-ngx/btp/tool-layout';

@Component({
    selector: 'fdb-tool-layout-basic-example',
    templateUrl: './tool-layout-basic-example.component.html',
    imports: [
        ToolLayoutDirective,
        ToolLayoutContainerDirective,
        ToolLayoutContentContainerDirective,
        ToolLayoutHeaderContainerDirective,
        ToolLayoutNavigationContainerDirective
    ],
    standalone: true
})
export class ToolLayoutBasicExampleComponent {}
