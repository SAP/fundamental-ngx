import { Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ToolbarComponent, ToolbarItemDirective, ToolbarSpacerDirective } from '@fundamental-ngx/core/toolbar';

@Component({
    selector: 'fd-toolbar-overflow-priority-example',
    templateUrl: './toolbar-overflow-priority-example.component.html',
    imports: [ToolbarComponent, ButtonComponent, ToolbarItemDirective, ToolbarSpacerDirective]
})
export class ToolbarOverflowPriorityExampleComponent {}
