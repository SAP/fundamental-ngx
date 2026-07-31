import { Component } from '@angular/core';
import { ToolbarComponent, ToolbarLabelDirective } from '@fundamental-ngx/core/toolbar';

@Component({
    selector: 'fd-toolbar-type-example',
    templateUrl: './toolbar-type-example.component.html',
    imports: [ToolbarComponent, ToolbarLabelDirective]
})
export class ToolbarTypeExampleComponent {}
