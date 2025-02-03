import { Component } from '@angular/core';
import {
    ToolLayoutComponent,
    ToolLayoutContainerDirective,
    ToolLayoutContentContainerDirective,
    ToolLayoutHeaderContainerDirective,
    ToolLayoutNavigationContainerDirective
} from '@fundamental-ngx/btp/tool-layout';

@Component({
    selector: 'fdb-tool-layout-tablet-example',
    templateUrl: './tool-layout-tablet-example.component.html',
    imports: [
        ToolLayoutComponent,
        ToolLayoutContainerDirective,
        ToolLayoutContentContainerDirective,
        ToolLayoutHeaderContainerDirective,
        ToolLayoutNavigationContainerDirective
    ]
})
export class ToolLayoutTabletExampleComponent {}
