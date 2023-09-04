import { Component } from '@angular/core';
import { PanelModule } from '@fundamental-ngx/core/panel';

@Component({
    selector: 'fd-panel-fixed-example',
    templateUrl: './panel-fixed-example.component.html',
    standalone: true,
    imports: [PanelModule]
})
export class PanelFixedExampleComponent {}
