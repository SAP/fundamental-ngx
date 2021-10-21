import { Directive, ElementRef, HostBinding, Input, OnDestroy } from '@angular/core';
import { MenuComponent } from '../menu.component';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Directive({
    selector: '[fdMenuTrigger]'
})
export class MenuTriggerDirective implements OnDestroy {
    /** Set reference to Menu Component */
    @Input('fdMenuTrigger')
    set menu(menu: MenuComponent) {
        if (menu) {
            menu.trigger = this._elementRef;
            this._listenOnExpanded(menu);
        }
        this._setAriaAttributes(menu);
    }

    @HostBinding('attr.aria-haspopup')
    ariaHasPopup: boolean;

    @HostBinding('attr.aria-controls')
    ariaControls: string;

    @HostBinding('attr.aria-expanded')
    ariaExpanded: boolean;

    /** @hidden */
    private _isExpandedSubscription: Subscription;

    /** @hidden */
    constructor(private _elementRef: ElementRef) {}

    /** @hidden */
    ngOnDestroy(): void {
        this._unsubscribeExpandedListener();
    }

    /** @hidden */
    private _listenOnExpanded(menu: MenuComponent): void {
        this._unsubscribeExpandedListener();
        if (menu) {
            this._isExpandedSubscription = menu.isOpenChange
                .pipe(startWith(menu.isOpen))
                .subscribe((isOpen) => (this.ariaExpanded = isOpen));
        }
    }

    /** @hidden */
    private _setAriaAttributes(menu: MenuComponent): void {
        this.ariaHasPopup = !!menu;
        this.ariaControls = menu ? menu.id : null;
    }

    /** @hidden */
    private _unsubscribeExpandedListener(): void {
        if (this._isExpandedSubscription) {
            this._isExpandedSubscription.unsubscribe();
        }
    }
}
