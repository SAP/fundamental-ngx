import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { PlatformInputGroupModule } from '@fundamental-ngx/platform/form';
import { FormLabelModule } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fdp-input-group-compact-example',
    templateUrl: './platform-input-group-compact-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FormLabelModule, PlatformInputGroupModule, ContentDensityDirective, PlatformButtonModule]
})
export class PlatformInputGroupCompactExampleComponent {}
