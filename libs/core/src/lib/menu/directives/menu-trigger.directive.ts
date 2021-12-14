import { ChangeDetectorRef, Directive, ElementRef, HostBinding, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

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
    ariaHasPopup: string;

    /** @hidden */
    @HostBinding('attr.aria-controls')
    ariaControls: string;

    /** @hidden */
    @HostBinding('attr.aria-expanded')
    ariaExpanded: boolean;

    /** @hidden */
    private _menuSubscription: Subscription = new Subscription();

    /** @hidden */
    constructor(private _elementRef: ElementRef, private _changeDetectorRef: ChangeDetectorRef) {}

    /** @hidden */
    ngOnDestroy(): void {
        this._unsubscribeFromMenu();
    }

    /** @hidden */
    private _subscribeToMenu(menu: MenuComponent): void {
        this._menuSubscription.add(
            menu.isOpenChange.pipe(startWith(menu)).subscribe(() => {
                this._setAriaAttributes(menu);
                this._changeDetectorRef.markForCheck();
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
        this.ariaHasPopup = menu ? 'menu' : null;
        this.ariaExpanded = menu?.isOpen;
        this.ariaControls = menu?.isOpen ? menu.id : null;
    }
}
