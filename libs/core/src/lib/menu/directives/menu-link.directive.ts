import { Directive, ElementRef, Host, HostBinding, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { Subscription } from 'rxjs';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-menu-link]'
})
export class MenuLinkDirective implements OnInit, OnDestroy {

    /** Mark as disabled */
    @Input()
    @HostBinding('class.is-disabled')
    disabled: boolean = false;

    /** Mark as selected */
    @Input()
    @HostBinding('class.is-selected')
    selected: boolean = false;

    /** @hidden Whether menu item has currently open sub menu */
    @HostBinding('class.has-child')
    fdHasChildClass: boolean = false;

    /** @hidden */
    @HostBinding('class.fd-menu__link')
    readonly fdMenuLinkClass: boolean = true;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden Update sub menu visibility */
    @HostListener('click')
    onClick() {
        if (this._menuItem.subMenu) {
            this._menuItem.subLevelVisible$.next(!this._menuItem.subLevelVisible$.value);
        }
    };

    /** @hidden */
    constructor(
        public elementRef: ElementRef,
        @Host() private _menuItem: MenuItemComponent
    ) {
    }

    /** @hidden */
    ngOnInit() {
        this._listenOnActiveSublist();
    }

    /** @hidden */
    ngOnDestroy() {
        this._subscriptions.unsubscribe();
    }

    /** @hidden */
    private _listenOnActiveSublist(): void {
        this._subscriptions.add(
            this._menuItem.subLevelVisible$.subscribe(isVisible => this.fdHasChildClass = isVisible)
        );
    }
}
