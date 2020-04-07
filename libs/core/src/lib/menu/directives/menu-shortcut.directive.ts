import { AfterViewInit, Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { MenuComponent } from '../menu.component';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-menu-shortcut]'
})
export class MenuShortcutDirective implements AfterViewInit {

    /** Hide shortcuts in mobile mode */
    @Input()
    hideOnMobile: boolean = true;

    /** @hidden */
    @HostBinding('class.fd-menu__shortcut')
    fdMenuShortcutClass: boolean = true;

    /** @hidden */
    @HostBinding('class.fd-menu__addon-after')
    fdMenuAddonAfterClass: boolean = true;

    /** @hidden */
    constructor(private _menuComponent: MenuComponent,
                private _elementRef: ElementRef) {
    }

    /** @hidden */
    ngAfterViewInit() {
        this._hideOnMobile();
    }

    /** @hidden */
    private _hideOnMobile(): void {
        if (this.hideOnMobile && this._menuComponent.mobile) {
            this._elementRef.nativeElement.style.display = 'none';
        }
    }
}
