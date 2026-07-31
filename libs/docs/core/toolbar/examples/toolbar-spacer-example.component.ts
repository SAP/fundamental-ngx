import { Component } from '@angular/core';
import { ToolbarComponent, ToolbarLabelDirective, ToolbarSpacerDirective } from '@fundamental-ngx/core/toolbar';

@Component({
    selector: 'fd-toolbar-spacer-example',
    templateUrl: './toolbar-spacer-example.component.html',
    imports: [ToolbarComponent, ToolbarLabelDirective, ToolbarSpacerDirective]
})
export class ToolbarSpacerExampleComponent {}
