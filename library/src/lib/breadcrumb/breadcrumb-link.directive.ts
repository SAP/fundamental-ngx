import { Directive } from '@angular/core';

@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-breadcrumb-link]',
    host: {
        class: 'fd-breadcrumb__link'
    }
})
export class BreadcrumbLinkDirective {}
