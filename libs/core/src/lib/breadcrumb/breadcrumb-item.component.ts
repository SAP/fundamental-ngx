import { Component, ContentChild, ElementRef, forwardRef, Renderer2 } from '@angular/core';
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

    /** @hidden */
    get width(): number {
        return this._elementRef.nativeElement.getBoundingClientRect().width;
    }

    constructor(private _elementRef: ElementRef<HTMLElement>, private renderer2: Renderer2) {}

    /** @hidden */
    get needsClickProxy(): boolean {
        return (
            !!this.breadcrumbLink?.elementRef().nativeElement.getAttribute('href') || !!this.breadcrumbLink.routerLink
        );
    }

    show = (): void => this.renderer2.setStyle(this._elementRef.nativeElement, 'display', 'inline-block');

    hide = (): void => this.renderer2.setStyle(this._elementRef.nativeElement, 'display', 'none');
}
