import { Component } from '@angular/core';
import { PlatformPanelModule } from '@fundamental-ngx/platform/panel';

@Component({
    selector: 'fdp-panel-fixed-example',
    templateUrl: './platform-panel-fixed-example.component.html',
    standalone: true,
    imports: [PlatformPanelModule]
})
export class PlatformPanelFixedExampleComponent {}
