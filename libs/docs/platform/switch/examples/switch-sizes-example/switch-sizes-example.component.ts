import { Component } from '@angular/core';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { PlatformSwitchModule } from '@fundamental-ngx/platform/form';
import { FdpFormGroupModule } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-switch-sizes-example',
    templateUrl: './switch-sizes-example.component.html',
    standalone: true,
    imports: [FdpFormGroupModule, PlatformSwitchModule, ContentDensityDirective]
})
export class SwitchSizesExampleComponent {}
