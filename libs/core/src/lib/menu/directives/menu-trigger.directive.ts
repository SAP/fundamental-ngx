import { Directive, ElementRef, HostBinding, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Nullable } from '@fundamental-ngx/cdk/utils';

import { MenuComponent } from '../menu.component';

@Directive({
    selector: '[fdMenuTrigger]'
})
export class MenuTriggerDirective implements OnDestroy {
    /** Set reference to Menu Component */
    @Input('fdMenuTrigger')
    set menu(menu: MenuComponent | undefined) {
        this._unsubscribeFromMenu();

        if (menu) {
            menu.trigger = this._elementRef;
            this._subscribeToMenu(menu);
        }

        this._setAriaAttributes(menu);
    }

    /** @hidden */
    @HostBinding('attr.aria-haspopup')
    ariaHasPopup: Nullable<boolean>;

    /** @hidden */
    @HostBinding('attr.aria-controls')
    ariaControls: Nullable<string>;

    /** @hidden */
    @HostBinding('attr.aria-expanded')
    ariaExpanded: Nullable<boolean>;

    /** @hidden */
    private _menuSubscription: Subscription = new Subscription();

    /** @hidden */
    constructor(private _elementRef: ElementRef) {}

    /** @hidden */
    ngOnDestroy(): void {
        this._unsubscribeFromMenu();
    }

    /** @hidden */
    private _subscribeToMenu(menu: MenuComponent): void {
        this._menuSubscription.add(
            menu.isOpenChange.subscribe(() => {
                this._setAriaAttributes(menu);
            })
        );
    }

    /** @hidden */
    private _unsubscribeFromMenu(): void {
        this._menuSubscription.unsubscribe();
        this._menuSubscription = new Subscription();
    }

    /** @hidden */
    private _setAriaAttributes(menu?: MenuComponent): void {
        this.ariaHasPopup = !!menu;
        this.ariaExpanded = menu?.isOpen;
        this.ariaControls = menu?.isOpen ? menu.id : null;
    }
}
