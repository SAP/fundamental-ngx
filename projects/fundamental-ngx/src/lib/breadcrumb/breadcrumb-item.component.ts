import { Component, Input } from '@angular/core';

@Component({
    selector: 'fd-breadcrumb-item',
    host: {
        class: 'fd-breadcrumb__item'
    },
    templateUrl: './breadcrumb-item.component.html'
})
export class BreadcrumbItemComponent {
    @Input() url: string;

    @Input() routerLink;

    getCursor() {
        let retVal = 'text';
        if (this.url || this.routerLink) {
            retVal = 'pointer';
        }
        return retVal;
    }
}
