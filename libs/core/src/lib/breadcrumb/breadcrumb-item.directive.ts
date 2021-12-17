import { AfterContentInit, ContentChild, Directive, ElementRef, forwardRef } from '@angular/core';
import { FocusableOption } from '@angular/cdk/a11y';

import { DynamicPageBaseActions } from '@fundamental-ngx/core/dynamic-page';
import { BreadcrumbLinkDirective } from './breadcrumb-link.directive';

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
export class BreadcrumbItemDirective extends DynamicPageBaseActions implements FocusableOption, AfterContentInit {
    /** @hidden */
    get elementRef(): ElementRef {
        return this._elementRef;
    }

    /** @hidden */
    href = '';

    /** @hidden */
    routerLink = '';

    /** @hidden */
    @ContentChild(forwardRef(() => BreadcrumbLinkDirective))
    breadcrumbLink: BreadcrumbLinkDirective;

    constructor(private _elementRef: ElementRef) {
        super();
    }

    /** @hidden */
    ngAfterContentInit(): void {
        if (this.breadcrumbLink && this.breadcrumbLink.elementRef.nativeElement.getAttribute('href')) {
            this.href = this.breadcrumbLink.elementRef.nativeElement.getAttribute('href');
        }
        if (this.breadcrumbLink && this.breadcrumbLink.routerLink) {
            this.routerLink = this.breadcrumbLink.routerLink;
        }
    }

    /** @hidden */
    focus(): void {
        if (this.breadcrumbLink && this.breadcrumbLink.elementRef.nativeElement.getAttribute('href')) {
            this.breadcrumbLink.elementRef.nativeElement.focus();
        }
    }
}
