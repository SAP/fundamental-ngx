import { Component } from '@angular/core';
import { PlatformLinkModule } from '@fundamental-ngx/platform/link';

@Component({
    selector: 'fdp-platform-link-misc-example',
    templateUrl: './platform-link-misc-example.component.html',
    styles: [
        `
            .fd-docs-truncate {
                display: inline-block;
                width: 100px;
            }
            .fd-docs-wrap {
                width: 100px;
                white-space: normal;
                overflow: break-word;
                display: inline-block;
            }
        `
    ],
    imports: [PlatformLinkModule]
})
export class PlatformLinkMiscExamplesComponent {}
