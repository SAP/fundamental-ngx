import { Component } from '@angular/core';
import { PanelComponent, PanelContentDirective, PanelTitleDirective } from '@fundamental-ngx/core/panel';

@Component({
    selector: 'fd-panel-fixed-example',
    templateUrl: './panel-fixed-example.component.html',
    imports: [PanelComponent, PanelContentDirective, PanelTitleDirective]
})
export class PanelFixedExampleComponent {}
