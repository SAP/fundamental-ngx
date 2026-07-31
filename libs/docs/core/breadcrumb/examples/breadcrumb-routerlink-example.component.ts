import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadcrumbModule } from '@fundamental-ngx/core/breadcrumb';
import { LinkComponent } from '@fundamental-ngx/core/link';

@Component({
    selector: 'fd-breadcrumb-routerlink-example',
    templateUrl: './breadcrumb-routerlink-example.component.html',
    styles: [
        `
            :host {
                display: block;
                width: 100%;
            }
        `
    ],
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
