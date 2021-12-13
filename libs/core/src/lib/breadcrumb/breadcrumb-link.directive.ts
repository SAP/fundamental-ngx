import { Directive, ElementRef, Input } from '@angular/core';

/**
 * Breadcrumb link directive. Use Angular router options (such as 'routerLink' and 'queryParams') with this directive.
 *
 * ```html
 * <a fd-breadcrumb-link [routerLink]="'some-url'" [queryParams]="'params'">Breadcrumb Link</a>
 * ```
 */
@Directive({
    // TODO to be discussed
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-breadcrumb-link]',
    host: {
        class: 'fd-breadcrumb__link',
        role: 'list'
    }
})
export class BreadcrumbLinkDirective {
    /** @hidden */
    @Input()
    routerLink = '';

    get elementRef(): ElementRef {
        return this._elementRef;
    }

    constructor(private _elementRef: ElementRef) {}
}
