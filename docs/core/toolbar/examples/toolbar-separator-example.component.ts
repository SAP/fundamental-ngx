import { Component } from '@angular/core';
import { ToolbarComponent, ToolbarLabelDirective, ToolbarSeparatorComponent } from '@fundamental-ngx/core/toolbar';

@Component({
    selector: 'fd-toolbar-separator-example',
    templateUrl: './toolbar-separator-example.component.html',
    imports: [ToolbarComponent, ToolbarLabelDirective, ToolbarSeparatorComponent]
})
export class ToolbarSeparatorExampleComponent {}
