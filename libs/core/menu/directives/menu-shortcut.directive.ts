import { AfterViewInit, Directive, ElementRef, HostBinding, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MenuItemComponent } from '../menu-item/menu-item.component';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-menu-shortcut]',
    standalone: true
})
export class MenuShortcutDirective implements AfterViewInit, OnDestroy {
    /** Hide shortcuts in mobile mode */
    @Input()
    hideOnMobile = true;

    /** @ignore */
    @HostBinding('class.fd-menu__shortcut')
    readonly fdMenuShortcutClass: boolean = true;

    /** @ignore */
    private _subscriptions: Subscription = new Subscription();

    /** @ignore */
    constructor(
        private _menuItem: MenuItemComponent,
        private _elementRef: ElementRef
    ) {}

    /** @ignore */
    ngAfterViewInit(): void {
        this._hideOnMobile();
    }

    /** @ignore */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @ignore */
    private _hideOnMobile(): void {
        this._subscriptions.add(
            this._menuItem.menuService?.isMobileMode.pipe(filter(() => this.hideOnMobile)).subscribe((isMobile) => {
                if (isMobile) {
                    this._elementRef.nativeElement.style.display = 'none';
                } else {
                    this._elementRef.nativeElement.style.display = null;
                }
            })
        );
    }
}
