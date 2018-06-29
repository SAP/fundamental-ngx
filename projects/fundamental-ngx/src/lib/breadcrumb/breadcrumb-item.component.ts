import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'fd-breadcrumb-item',
    host: {
        class: 'fd-breadcrumb__item'
    },
    templateUrl: './breadcrumb-item.component.html'
})
export class BreadcrumbItemComponent {
    constructor(private router: Router) {}

    @Input() url: string;

    getCursor(url) {
        let retVal = 'text';
        if (url) {
            retVal = 'pointer';
        }
        return retVal;
    }
}
