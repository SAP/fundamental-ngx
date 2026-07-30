import { Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ToolbarComponent, ToolbarItemDirective } from '@fundamental-ngx/core/toolbar';

@Component({
    selector: 'fd-toolbar-overflow-grouping-example',
    templateUrl: './toolbar-overflow-grouping-example.component.html',
    imports: [ToolbarComponent, ButtonComponent, ToolbarItemDirective]
})
export class ToolbarOverflowGroupingExampleComponent {}
