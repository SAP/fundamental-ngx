import { Component } from '@angular/core';
import { LayoutPanelModule } from '@fundamental-ngx/core/layout-panel';

@Component({
    selector: 'fd-layout-panel-example',
    templateUrl: './layout-panel-example.component.html',
    standalone: true,
    imports: [LayoutPanelModule]
})
export class LayoutPanelExampleComponent {}
