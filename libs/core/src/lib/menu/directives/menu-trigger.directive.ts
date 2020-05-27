import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { MenuComponent } from '../menu.component';

@Directive({
    selector: '[fdMenuTrigger]'
})
export class MenuTriggerDirective {

    /** Set reference to Menu Component */
    @Input('fdMenuTrigger')
    set menu(menu: MenuComponent) {
        this._menu = menu;
        this._menu.trigger = this._elementRef;
    }

    /** @hidden */
    private _menu: MenuComponent;

    /** Toggles the Menu when interacted with */
    @HostListener('click')
    handleInteraction() {
        this._menu.toggle();
    }

    /** @hidden */
    constructor(private _elementRef: ElementRef) { }
}
