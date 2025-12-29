import { Component } from '@angular/core';
import { FdpFormGroupModule, PlatformSwitchModule } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-switch-sizes-example',
    templateUrl: './switch-sizes-example.component.html',
    imports: [FdpFormGroupModule, PlatformSwitchModule]
})
export class SwitchSizesExampleComponent {}
