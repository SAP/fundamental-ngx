import { Directive } from '@angular/core';

@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: 'fd-breadcrumb-item',
    host: {
        class: 'fd-breadcrumb__item'
    }
})
export class BreadcrumbItemDirective {}
