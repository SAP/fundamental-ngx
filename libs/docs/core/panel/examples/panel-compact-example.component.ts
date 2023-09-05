import { Component } from '@angular/core';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { PanelModule } from '@fundamental-ngx/core/panel';

@Component({
    selector: 'fd-panel-compact-example',
    templateUrl: './panel-compact-example.component.html',
    standalone: true,
    imports: [PanelModule, ContentDensityDirective]
})
export class PanelCompactExampleComponent {}
