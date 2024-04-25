import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { PlatformLinkModule } from '@fundamental-ngx/platform/link';

@Component({
    selector: 'fdp-platform-link-example',
    templateUrl: './platform-link-example.component.html',
    styles: [
        `
            .fddoc-example-link {
                background-color: var(--sapTextColor);
                padding: 1rem;
            }
            .fddoc-truncate {
                display: inline-block;
                width: 150px;
            }
        `
    ],
    standalone: true,
    imports: [PlatformLinkModule, IconComponent, NgStyle]
})
export class PlatformLinkExampleComponent {}
