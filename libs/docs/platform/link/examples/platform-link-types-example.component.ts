import { Component } from '@angular/core';
import { PlatformLinkModule } from '@fundamental-ngx/platform/link';

@Component({
    selector: 'fdp-platform-link-types-example',
    templateUrl: './platform-link-types-example.component.html',
    styles: [
        `
            .fddoc-example-link {
                background-color: black;
                padding: 1rem;
            }
        `
    ],
    standalone: true,
    imports: [PlatformLinkModule]
})
export class PlatformLinkTypesExampleComponent {}
