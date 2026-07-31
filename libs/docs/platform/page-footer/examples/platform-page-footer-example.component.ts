import { Component } from '@angular/core';
import { PlatformLinkModule } from '@fundamental-ngx/platform/link';
import { PlatformPageFooterModule } from '@fundamental-ngx/platform/page-footer';

@Component({
    selector: 'fdp-platform-footer-example',
    templateUrl: './platform-page-footer-example.component.html',
    imports: [PlatformPageFooterModule, PlatformLinkModule]
})
export class PlatformPageFooterExampleComponent {}
