import { Directive, ElementRef, NgModule, OnDestroy, OnInit } from '@angular/core';

import { MenuService } from '../services/menu.service';

/**
 * This directive adds keyboard support to menu list.
 * This is not part of public Menu API
 *
 */
@Directive({
    selector: '[fdMenuKeydownListener]'
})
export class MenuKeydownListenerDirective implements OnInit, OnDestroy {
    /** @hidden */
    constructor(private _elementRef: ElementRef, private _menuService: MenuService) {}

    /** @hidden */
    ngOnInit(): void {
        this._menuService.addKeyboardSupport(this._elementRef);
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._menuService.removeKeyboardSupport();
    }
}

/**
 * Since the directive is shared between
 * menu module and menu mobile module
 * it is needed to keep in a separate module
 *
 */

@NgModule({
    declarations: [MenuKeydownListenerDirective],
    exports: [MenuKeydownListenerDirective]
})
export class MenuKeydownListenerModule {}
