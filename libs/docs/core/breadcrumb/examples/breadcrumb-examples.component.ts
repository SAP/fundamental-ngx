import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { BreadcrumbModule } from '@fundamental-ngx/core/breadcrumb';

@Component({
    selector: 'fd-breadcrumb-routerLink-example',
    templateUrl: './breadcrumb-routerLink-example.component.html',
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
export class BreadcrumbRouterLinkExampleComponent {
    showIcon = true;
    glyph = 'delete';

    constructor() {
        setInterval(() => {
            this.glyph = this.glyph === 'delete' ? 'add' : 'delete';
            // this.showIcon = !this.showIcon
        }, 3000);
    }
}

@Component({
    selector: 'fd-breadcrumb-href-example',
    templateUrl: './breadcrumb-href-example.component.html',
    styles: [
        `
            :host {
                display: block;
                width: 100%;
            }
        `
    ],
    standalone: true,
    imports: [BreadcrumbModule, LinkComponent]
})
export class BreadcrumbHrefExampleComponent {}
