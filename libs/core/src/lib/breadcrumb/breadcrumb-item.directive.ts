import { AfterContentInit, OnDestroy, ContentChild, Directive, ElementRef, forwardRef } from '@angular/core';
import { FocusableOption } from '@angular/cdk/a11y';
import { Subscription } from 'rxjs';

import { BreadcrumbLinkDirective } from './breadcrumb-link.directive';
import { DynamicPageBaseActions } from '@fundamental-ngx/core/dynamic-page';

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
export class BreadcrumbItemDirective
    extends DynamicPageBaseActions
    implements FocusableOption, AfterContentInit, OnDestroy
{
    /** @hidden */
    get elementRef(): ElementRef {
        return this._elementRef;
    }

    /** @hidden */
    href = '';

    /** @hidden */
    routerLink = '';

    /** @hidden */
    private _subscription = new Subscription();

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
    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

    /** @hidden */
    focus(): void {
        if (this.breadcrumbLink && this.breadcrumbLink.elementRef.nativeElement.getAttribute('href')) {
            this.breadcrumbLink.elementRef.nativeElement.focus();
        }
    }
}
