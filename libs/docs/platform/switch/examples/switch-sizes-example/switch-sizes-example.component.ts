import { Component } from '@angular/core';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { FdpFormGroupModule, PlatformSwitchModule } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-switch-sizes-example',
    templateUrl: './switch-sizes-example.component.html',
    imports: [FdpFormGroupModule, PlatformSwitchModule, ContentDensityDirective]
})
export class SwitchSizesExampleComponent {}
