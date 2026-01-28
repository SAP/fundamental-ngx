import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadcrumbModule } from '@fundamental-ngx/core/breadcrumb';
import { LinkComponent } from '@fundamental-ngx/core/link';

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
    imports: [BreadcrumbModule, LinkComponent]
})
export class BreadcrumbHrefExampleComponent {
    onClick(value: string): void {
        window.alert(value);
    }
}

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
