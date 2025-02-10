import { Component } from '@angular/core';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { PlatformLinkModule } from '@fundamental-ngx/platform/link';

@Component({
    selector: 'fdp-platform-link-example',
    templateUrl: './platform-link-example.component.html',
    imports: [PlatformLinkModule, IconComponent]
})
export class PlatformLinkExampleComponent {}
