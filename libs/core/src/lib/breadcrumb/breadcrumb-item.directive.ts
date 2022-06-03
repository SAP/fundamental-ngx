import { AfterContentInit, ContentChild, Directive, ElementRef, forwardRef } from '@angular/core';
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
export class BreadcrumbItemDirective implements AfterContentInit {
    /** @hidden */
    get elementRef(): ElementRef {
        return this._elementRef;
    }

    /** @hidden */
    href = '';

    /** @hidden */
    routerLink = '';

    /** @hidden */
    @ContentChild(forwardRef(() => LinkComponent))
    breadcrumbLink: LinkComponent;

    constructor(private _elementRef: ElementRef) {}

    /** @hidden */
    ngAfterContentInit(): void {
        if (this.breadcrumbLink && this.breadcrumbLink.elementRef().nativeElement.getAttribute('href')) {
            this.href = this.breadcrumbLink.elementRef().nativeElement.getAttribute('href');
        }
        // if (this.breadcrumbLink && this.breadcrumbLink.routerLink) {
        //     this.routerLink = this.breadcrumbLink.routerLink;
        // }
    }
}
