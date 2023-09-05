import { Component } from '@angular/core';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { PlatformPanelModule } from '@fundamental-ngx/platform/panel';

@Component({
    selector: 'fdp-panel-actions-example',
    templateUrl: './platform-panel-actions-example.component.html',
    standalone: true,
    imports: [PlatformPanelModule, PlatformButtonModule]
})
export class PlatformPanelActionsExampleComponent {}
