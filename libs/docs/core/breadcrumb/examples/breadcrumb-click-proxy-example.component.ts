import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadcrumbModule } from '@fundamental-ngx/core/breadcrumb';
import { LinkComponent } from '@fundamental-ngx/core/link';

@Component({
    selector: 'fd-breadcrumb-click-proxy-example',
    templateUrl: './breadcrumb-click-proxy-example.component.html',
    styles: [
        `
            :host {
                display: block;
                width: 100%;
            }
        `
    ],
    standalone: true,
    imports: [BreadcrumbModule, LinkComponent, RouterLink]
})
export class BreadcrumbClickProxyExampleComponent {

    constructor() {
    }

    onBreadCrumbClick(level: string) {
        alert('BreadCrumb Click! Level' + level)
    }
}
