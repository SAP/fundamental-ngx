import { Component } from '@angular/core';
import { PanelComponent, PanelContentDirective, PanelTitleDirective } from '@fundamental-ngx/core/panel';

@Component({
    selector: 'fd-panel-fixed-height-example',
    templateUrl: './panel-fixed-height-example.component.html',
    imports: [PanelComponent, PanelContentDirective, PanelTitleDirective]
})
export class PanelFixedHeightExampleComponent {}
