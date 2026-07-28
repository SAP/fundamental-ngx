import { Component } from '@angular/core';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { PlatformLinkModule } from '@fundamental-ngx/platform/link';
import { PlatformPageFooterModule } from '@fundamental-ngx/platform/page-footer';

@Component({
    selector: 'fdp-platform-footer-with-icon-example',
    templateUrl: './platform-page-footer-with-icon-example.component.html',
    imports: [PlatformPageFooterModule, PlatformLinkModule, IconComponent]
})
export class PlatformPageFooterWithIconExampleComponent {}
