import { Directive, ElementRef, HostListener, Input, OnDestroy, Optional } from '@angular/core';
import { LEFT_ARROW, RIGHT_ARROW, TAB } from '@angular/cdk/keycodes';
import { KeyUtil, RtlService } from '@fundamental-ngx/core/utils';
import { BreadcrumbItemDirective } from './breadcrumb-item.directive';
import { Subscription } from 'rxjs';

/**
 * Breadcrumb link directive. Use Angular router options (such as 'routerLink' and 'queryParams') with this directive.
 *
 * ```html
 * <a fd-breadcrumb-link [routerLink]="'some-url'" [queryParams]="'params'">Breadcrumb Link</a>
 * ```
 */
@Directive({
    // TODO to be discussed
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-breadcrumb-link]',
    host: {
        class: 'fd-breadcrumb__link',
        '[attr.tabindex]': '_tabIndex'
    }
})
export class BreadcrumbLinkDirective implements OnDestroy {
    /** @hidden */
    @Input()
    routerLink = '';

    /** @hidden */
    private _isRtl = false;

    _tabIndex = '0';

    /** @hidden */
    private _subscriptions: Subscription = new Subscription();

    get elementRef(): ElementRef {
        return this._elementRef;
    }

    constructor(private _elementRef: ElementRef, @Optional() private _rtlService: RtlService) {
        this._subscriptions.add(this._rtlService?.rtl.subscribe((isRtl) => (this._isRtl = isRtl)));
    }

    @HostListener('keydown', ['$event'])
    handleKeydown(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, TAB)) {
            const target = <HTMLElement>event.target;
            console.log(target);
            target.focus();
        }

        const nextElement: HTMLElement = this.elementRef.nativeElement.parentElement.nextElementSibling.children[0];
        const prevElement: HTMLElement = this.elementRef.nativeElement.parentElement.previousElementSibling.children[0];
        const isNextElementLink = nextElement && nextElement.hasAttribute('href');
        const isPrevElementLink = prevElement && prevElement.hasAttribute('href');

        if (KeyUtil.isKeyCode(event, RIGHT_ARROW)) {
            this._isRtl ? isPrevElementLink && prevElement.focus() : isNextElementLink && nextElement.focus();
        }

        if (KeyUtil.isKeyCode(event, LEFT_ARROW)) {
            this._isRtl ? isNextElementLink && nextElement.focus() : isPrevElementLink && prevElement.focus();
        }
    }

    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }
}
