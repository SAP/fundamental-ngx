import { Directive } from '@angular/core';

@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: 'fd-breadcrumb',
    host: {
        class: 'fd-breadcrumb'
    }
})
export class BreadcrumbDirective {}
