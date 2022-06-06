import { ContentChild, Directive, ElementRef, forwardRef } from '@angular/core';
import { LinkComponent } from '@fundamental-ngx/core/link';

/**
 * Breadcrumb item directive. Must have child breadcrumb link directives.
 *
 * ```html
 * <fd-breadcrumb-item>
 *     <a fd-breadcrumb-link [routerLink]="'#'">Breadcrumb Link</a>
 * </fd-breadcrumb-item>
 * ```
 */
@Directive({
    // TODO to be discussed
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-breadcrumb-item',
    host: {
        class: 'fd-breadcrumb__item'
    }
})
export class BreadcrumbItemDirective {
    /** @hidden */
    get elementRef(): ElementRef {
        return this._elementRef;
    }

    /** @hidden */
    @ContentChild(forwardRef(() => LinkComponent))
    breadcrumbLink: LinkComponent;

    constructor(private _elementRef: ElementRef) {}

    /** @hidden */
    get needsClickProxy(): boolean {
        return (
            !!this.breadcrumbLink?.elementRef().nativeElement.getAttribute('href') || !!this.breadcrumbLink.routerLink
        );
    }
}
