import { Component, ContentChild, ElementRef, forwardRef } from '@angular/core';
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
@Component({
    selector: 'fd-breadcrumb-item',
    template: '<div style="display: inline"><ng-content></ng-content></div>',
    host: {
        class: 'fd-breadcrumb__item'
    }
})
export class BreadcrumbItemComponent {
    /** @hidden */
    get elementRef(): ElementRef<HTMLElement> {
        return this._elementRef;
    }

    /** @hidden */
    @ContentChild(forwardRef(() => LinkComponent))
    breadcrumbLink: LinkComponent;

    constructor(private _elementRef: ElementRef<HTMLElement>) {}

    /** @hidden */
    get needsClickProxy(): boolean {
        return (
            !!this.breadcrumbLink?.elementRef().nativeElement.getAttribute('href') || !!this.breadcrumbLink.routerLink
        );
    }
}
