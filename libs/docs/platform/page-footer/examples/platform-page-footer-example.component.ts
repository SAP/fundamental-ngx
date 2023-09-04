import { Component } from '@angular/core';
import { IconModule } from '@fundamental-ngx/core/icon';
import { PlatformLinkModule } from '@fundamental-ngx/platform/link';
import { PlatformPageFooterModule } from '@fundamental-ngx/platform/page-footer';

@Component({
    selector: 'fdp-platform-footer-example',
    templateUrl: './platform-page-footer-example.component.html',
    standalone: true,
    imports: [PlatformPageFooterModule, PlatformLinkModule]
})
export class PlatformPageFooterExampleComponent {}

@Component({
    selector: 'fdp-platform-footer-multiple-example',
    templateUrl: './platform-page-footer-multiple-line-example.component.html',
    standalone: true,
    imports: [PlatformPageFooterModule, PlatformLinkModule]
})
export class PlatformPageFooterMultipleLineExampleComponent {}

@Component({
    selector: 'fdp-platform-footer-with-icon-example',
    templateUrl: './platform-page-footer-with-icon-example.component.html',
    standalone: true,
    imports: [PlatformPageFooterModule, PlatformLinkModule, IconModule]
})
export class PlatformPageFooterWithIconExampleComponent {}
