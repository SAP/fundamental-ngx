import {
    AfterContentInit,
    AfterViewInit,
    OnDestroy,
    ContentChild,
    Directive,
    ElementRef,
    forwardRef,
    HostListener,
    Injector,
    Optional
} from '@angular/core';
import { BreadcrumbLinkDirective } from './breadcrumb-link.directive';
import { KeyUtil, RtlService } from '@fundamental-ngx/core/utils';
import { LEFT_ARROW, RIGHT_ARROW, TAB } from '@angular/cdk/keycodes';
import { BreadcrumbComponent } from './breadcrumb.component';
import { Subscription } from 'rxjs';

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
        private _injector: Injector,
        @Optional() private _rtlService: RtlService
    ) {
        this._subscription.add(this._rtlService.rtl.subscribe((isRtl) => (this._isRtl = isRtl)));
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

    ngAfterViewInit(): void {
        const breadcrumbComponent = this._injector.get<BreadcrumbComponent>(BreadcrumbComponent);
        this._arrowNavigation = breadcrumbComponent.arrowNavigation;
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
