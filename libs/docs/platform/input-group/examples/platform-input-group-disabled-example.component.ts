import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { PlatformInputGroupModule } from '@fundamental-ngx/platform/form';
import { FormLabelModule } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fdp-input-group-disabled-example',
    templateUrl: './platform-input-group-disabled-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FormLabelModule, PlatformInputGroupModule, PlatformButtonModule]
})
export class PlatformInputGroupDisabledExampleComponent {}
