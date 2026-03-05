import { Directive, ElementRef, HostBinding, inject, Input, OnDestroy } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { Subscription } from 'rxjs';

import { MenuComponent } from '../menu.component';

@Directive({
    selector: '[fdMenuTrigger]',
    standalone: true
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
    private readonly _elementRef = inject(ElementRef);

    /** @hidden */
    ngOnDestroy(): void {
        this._unsubscribeFromMenu();
    }

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
        this.ariaExpanded = menu?.isOpen();
        this.ariaControls = menu?.isOpen() ? menu.id() : null;
    }
}
