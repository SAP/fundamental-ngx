import { AfterContentInit, ContentChild, Directive, ElementRef, forwardRef } from '@angular/core';
import { BreadcrumbLinkDirective } from '@fundamental-ngx/core';

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
    // tslint:disable-next-line:directive-selector
    selector: 'fd-breadcrumb-item',
    host: {
        class: 'fd-breadcrumb__item'
    }
})
export class BreadcrumbItemDirective implements AfterContentInit {

    /** @hidden */
    href: string = '';

    /** @hidden */
    routerLink: string = '';

    @ContentChild(forwardRef(() => BreadcrumbLinkDirective), { static: false })
    breadcrumbLink: BreadcrumbLinkDirective;

    constructor(public elementRef: ElementRef) {}

    ngAfterContentInit(): void {
        if (this.breadcrumbLink && this.breadcrumbLink.elementRef.nativeElement.getAttribute('href')) {
            this.href = this.breadcrumbLink.elementRef.nativeElement.getAttribute('href');
            this.routerLink = this.breadcrumbLink.routerLink;
        }
    }

}
