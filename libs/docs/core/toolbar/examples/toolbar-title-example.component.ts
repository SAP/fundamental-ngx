import { Component } from '@angular/core';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { ToolbarComponent } from '@fundamental-ngx/core/toolbar';

@Component({
    selector: 'fd-toolbar-title-example',
    templateUrl: './toolbar-title-example.component.html',
    imports: [TitleComponent, ToolbarComponent, IconComponent]
})
export class ToolbarTitleExampleComponent {}
