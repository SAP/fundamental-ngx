import { Component } from '@angular/core';
import { PlatformLinkModule } from '@fundamental-ngx/platform/link';

@Component({
    selector: 'fdp-platform-link-misc-examples',
    templateUrl: './platform-link-misc-examples.component.html',
    styles: [
        `
            .fddoc-truncate {
                display: inline-block;
                width: 100px;
            }
            .fddoc-wrap {
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
