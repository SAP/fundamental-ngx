import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { ButtonComponent } from '@fundamental-ngx/platform/button';
import { PlatformInputGroupModule } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-input-group-disabled-example',
    templateUrl: './platform-input-group-disabled-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormLabelComponent, PlatformInputGroupModule, ButtonComponent]
})
export class PlatformInputGroupDisabledExampleComponent {}
