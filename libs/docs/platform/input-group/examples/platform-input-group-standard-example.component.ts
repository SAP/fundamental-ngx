import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IconModule } from '@fundamental-ngx/core/icon';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { PlatformInputGroupModule } from '@fundamental-ngx/platform/form';
import { FormLabelModule } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fdp-input-group-standard-example',
    templateUrl: './platform-input-group-standard-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FormLabelModule, PlatformInputGroupModule, PlatformButtonModule, IconModule]
})
export class PlatformInputGroupStandardExampleComponent {}
