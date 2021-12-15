import {
    AfterContentInit,
    AfterViewInit,
    OnDestroy,
    ContentChild,
    Directive,
    ElementRef,
    forwardRef,
    HostListener,
    Optional,
    Inject
} from '@angular/core';
import { LEFT_ARROW, RIGHT_ARROW, TAB } from '@angular/cdk/keycodes';
import { Subscription } from 'rxjs';

import { KeyUtil, RtlService } from '@fundamental-ngx/core/utils';
import { BreadcrumbLinkDirective } from './breadcrumb-link.directive';
import { BREADCRUMB_COMPONENT, BreadcrumbInterface } from './breadcrumb.interface';

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
export class BreadcrumbItemDirective implements AfterContentInit, AfterViewInit, OnDestroy {
    /** @hidden */
    get elementRef(): ElementRef {
        return this._elementRef;
    }

    /** @hidden */
    href = '';

    /** @hidden */
    routerLink = '';

    /** @hidden */
    private _arrowNavigation = false;

    /** @hidden */
    private _isRtl = false;

    /** @hidden */
    private _subscription = new Subscription();

    /** @hidden */
    @ContentChild(forwardRef(() => BreadcrumbLinkDirective))
    breadcrumbLink: BreadcrumbLinkDirective;

    constructor(
        private _elementRef: ElementRef,
        @Optional() private _rtlService: RtlService,
        @Inject(BREADCRUMB_COMPONENT) private _breadcrumbComponent: BreadcrumbInterface
    ) {
        this._subscription.add(this._rtlService?.rtl.subscribe((isRtl) => (this._isRtl = isRtl)));
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
    ngAfterViewInit(): void {
        this._arrowNavigation = this._breadcrumbComponent.arrowNavigation;
    }

    @HostListener('keydown', ['$event'])
    handleKeydown(event: KeyboardEvent): void {
        if (this._arrowNavigation) {
            const nextElement: HTMLElement = this.elementRef.nativeElement.nextElementSibling.children[0];
            const isNextElementLink = nextElement && nextElement.hasAttribute('href');
            const prevElement: HTMLElement = this.elementRef.nativeElement.previousElementSibling.children[0];
            const isPrevElementLink = prevElement && prevElement.hasAttribute('href');

            if (KeyUtil.isKeyCode(event, TAB) && isNextElementLink) {
                event.preventDefault();
            }

            if (KeyUtil.isKeyCode(event, RIGHT_ARROW)) {
                this._isRtl ? isPrevElementLink && prevElement.focus() : isNextElementLink && nextElement.focus();
            }

            if (KeyUtil.isKeyCode(event, LEFT_ARROW)) {
                this._isRtl ? isNextElementLink && nextElement.focus() : isPrevElementLink && prevElement.focus();
            }
        }
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }
}
