import { Component } from '@angular/core';

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
    ]
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
    ]
})
export class BreadcrumbHrefExampleComponent {}

@Component({
    selector: 'fd-breadcrumb-responsive-example',
    templateUrl: './breadcrumb-responsive-example.component.html'
})
export class BreadcrumbResponsiveExampleComponent {}
