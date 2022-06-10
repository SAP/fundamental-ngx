import { AfterContentInit, ContentChild, Directive, ElementRef, forwardRef } from '@angular/core';
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
    @ContentChild(forwardRef(() => BreadcrumbLinkDirective))
    breadcrumbLink: BreadcrumbLinkDirective;

    constructor(private _elementRef: ElementRef) {}

    /** @hidden */
    ngAfterContentInit(): void {
        const childElements = this._elementRef.nativeElement.getElementsByTagName('*');
        for (const child of childElements) {
            child.innerText = this._truncateBreadcrumbText(child.innerText);
        }
        if (this.breadcrumbLink && this.breadcrumbLink.elementRef.nativeElement.getAttribute('href')) {
            this.href = this.breadcrumbLink.elementRef.nativeElement.getAttribute('href');
        }
        if (this.breadcrumbLink && this.breadcrumbLink.routerLink) {
            this.routerLink = this.breadcrumbLink.routerLink;
        }
    }
    /**
     * @hidden
     *  it truncates breadcrumb text when item text is longer than 30 chars
     */
    private _truncateBreadcrumbText(text: string): string {
        if (text.length > 30) {
            text = text.substring(0, 29) + '...';
        }
        return text;
    }
}
