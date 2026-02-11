import { Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/platform/button';
import { PlatformPanelModule } from '@fundamental-ngx/platform/panel';

@Component({
    selector: 'fdp-panel-actions-example',
    templateUrl: './platform-panel-actions-example.component.html',
    imports: [PlatformPanelModule, ButtonComponent]
})
export class PlatformPanelActionsExampleComponent {}
