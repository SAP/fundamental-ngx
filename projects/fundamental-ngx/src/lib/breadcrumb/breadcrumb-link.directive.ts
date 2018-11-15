import { Directive } from '@angular/core';

@Directive({
    selector: '[fd-breadcrumb-link]',
    host: {
        class: 'fd-breadcrumb__link'
    }
})
export class BreadcrumbLinkDirective {}
