import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormLabelModule } from '@fundamental-ngx/core/form';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { PlatformInputGroupModule } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-input-group-disabled-example',
    templateUrl: './platform-input-group-disabled-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FormLabelModule, PlatformInputGroupModule, PlatformButtonModule]
})
export class PlatformInputGroupDisabledExampleComponent {}
