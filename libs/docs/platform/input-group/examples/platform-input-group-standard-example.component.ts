import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { ButtonComponent } from '@fundamental-ngx/platform/button';
import { PlatformInputGroupModule } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-input-group-standard-example',
    templateUrl: './platform-input-group-standard-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormLabelComponent, PlatformInputGroupModule, ButtonComponent, IconComponent]
})
export class PlatformInputGroupStandardExampleComponent {}
