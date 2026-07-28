import { Component } from '@angular/core';
import { BreadcrumbModule } from '@fundamental-ngx/core/breadcrumb';
import { LinkComponent } from '@fundamental-ngx/core/link';

@Component({
    selector: 'fd-breadcrumb-separator-example',
    templateUrl: './breadcrumb-separator-example.component.html',
    styles: [
        `
            :host {
                display: block;
                width: 100%;
            }
        `
    ],
    imports: [BreadcrumbModule, LinkComponent]
})
export class BreadcrumbSeparatorExampleComponent {}
