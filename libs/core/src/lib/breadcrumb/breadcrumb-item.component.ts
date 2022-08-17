import { DomPortal } from '@angular/cdk/portal';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ElementRef,
    forwardRef,
    ViewEncapsulation
} from '@angular/core';
import { LinkComponent } from '@fundamental-ngx/core/link';

/**
 * Breadcrumb item directive. Must have child breadcrumb link directives.
 *
 * ```html
 * <fd-breadcrumb-item>
 *     <a fd-link [routerLink]="'#'">Breadcrumb Link</a>
 * </fd-breadcrumb-item>
 * ```
 */
@Component({
    selector: 'fd-breadcrumb-item',
    template: '<ng-content></ng-content>',
    host: {
        class: 'fd-breadcrumb__item'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbItemComponent implements AfterViewInit {
    /** @hidden */
    @ContentChild(forwardRef(() => LinkComponent))
    breadcrumbLink: LinkComponent;

    /** In case there is no link in Item and breadcrumb item is non-interactive, we move whole item content to menu item title */
    breadcrumbItemPortal: DomPortal<Element>;

    /** When breadcrumb item has link in it, we are moving link content to menu item title */
    linkContentPortal: DomPortal;

    /**
     * Breadcrumb item dom portal.
     */
    portal: DomPortal;

    /** @hidden */
    private _attached = false;

    /** @hidden */
    constructor(public readonly elementRef: ElementRef<HTMLElement>) {}

    /** @hidden */
    focus(): void {
        if (this._needsClickProxy) {
            this.breadcrumbLink.elementRef().nativeElement.focus();
        }
    }

    /** @hidden */
    get _needsClickProxy(): boolean {
        return (
            !!this.breadcrumbLink?.elementRef().nativeElement.getAttribute('href') || !!this.breadcrumbLink.routerLink
        );
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._attach();
    }

    /**
     * Sets breadcrumb item dom portal.
     */
    setPortal(): void {
        if (!this.portal) {
            this.portal = new DomPortal(this.elementRef);
        }
    }

    /** @hidden */
    _detach(): void {
        if (!this._attached) {
            return;
        }

        if (this.linkContentPortal?.isAttached) {
            this.linkContentPortal?.detach();
        }

        if (this.breadcrumbItemPortal?.isAttached) {
            this.breadcrumbItemPortal?.detach();
        }

        this._attached = false;
    }

    /** @hidden */
    _attach(): void {
        if (this._attached) {
            return;
        }

        if (this.breadcrumbLink && this.breadcrumbLink.contentSpan) {
            this.linkContentPortal = new DomPortal<HTMLElement>(this.breadcrumbLink.contentSpan.nativeElement);
        }

        this.breadcrumbItemPortal = new DomPortal(this.elementRef.nativeElement.firstElementChild as Element);
        this._attached = true;
    }
}
