import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    forwardRef,
    Renderer2
} from '@angular/core';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { DomPortal } from '@angular/cdk/portal';

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
    template: '<div style="display: inline"><ng-content></ng-content></div>',
    host: {
        class: 'fd-breadcrumb__item'
    }
})
export class BreadcrumbItemComponent implements AfterViewInit {
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

    /** In case there is no link in Item and breadcrumb item is non-interactive, we move whole item content to menu item title */
    breadcrumbItemPortal: DomPortal<Element>;

    /** When breadcrumb item has link in it, we are moving link content to menu item title */
    linkContentPortal: DomPortal;

    constructor(
        private _elementRef: ElementRef<HTMLElement>,
        private renderer2: Renderer2,
        private _cdR: ChangeDetectorRef
    ) {}

    /** @hidden */
    get needsClickProxy(): boolean {
        return (
            !!this.breadcrumbLink?.elementRef().nativeElement.getAttribute('href') || !!this.breadcrumbLink.routerLink
        );
    }

    show = (): void => this.renderer2.setStyle(this._elementRef.nativeElement, 'display', 'inline-block');
    hide = (): void => this.renderer2.setStyle(this._elementRef.nativeElement, 'display', 'none');

    /** @hidden */
    ngAfterViewInit(): void {
        if (this.breadcrumbLink) {
            this.linkContentPortal = new DomPortal<HTMLElement>(this.breadcrumbLink.contentSpan.nativeElement);
        }
        this.breadcrumbItemPortal = new DomPortal(this.elementRef.nativeElement.firstElementChild as Element);
        this._cdR.detectChanges();
    }
}
