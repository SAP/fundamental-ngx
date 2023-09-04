import { Component } from '@angular/core';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { PlatformPanelModule } from '@fundamental-ngx/platform/panel';

@Component({
    selector: 'fdp-panel-compact-example',
    templateUrl: './platform-panel-compact-example.component.html',
    standalone: true,
    imports: [PlatformPanelModule, ContentDensityDirective]
})
export class PlatformPanelCompactExampleComponent {}
