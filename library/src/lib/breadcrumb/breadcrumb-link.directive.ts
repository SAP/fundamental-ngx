import { Directive } from '@angular/core';

/**
 * Breadcrumb link directive. Use Angular router options (such as 'routerLink' and 'queryParams') with this directive.
 *
 * ```html
 * <a fd-breadcrumb-link [routerLink]="'some-url'" [queryParams]="'params'">Breadcrumb Link</a>
 * ```
 */
@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-breadcrumb-link]',
    host: {
        class: 'fd-breadcrumb__link'
    }
})
export class BreadcrumbLinkDirective {}
