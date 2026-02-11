import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { ButtonComponent } from '@fundamental-ngx/platform/button';
import { PlatformInputGroupModule } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-input-group-compact-example',
    templateUrl: './platform-input-group-compact-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormLabelComponent, PlatformInputGroupModule, ContentDensityDirective, ButtonComponent]
})
export class PlatformInputGroupCompactExampleComponent {}
