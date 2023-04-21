import { AfterViewInit, Directive, ElementRef, HostBinding, Input, OnDestroy } from '@angular/core';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-menu-shortcut]',
    standalone: true
})
export class MenuShortcutDirective implements AfterViewInit, OnDestroy {
    /** Hide shortcuts in mobile mode */
    @Input()
    hideOnMobile = true;

    /** @hidden */
    @HostBinding('class.fd-menu__shortcut')
    readonly fdMenuShortcutClass: boolean = true;

    /** @hidden */
    private _subscriptions: Subscription = new Subscription();

    /** @hidden */
    constructor(private _menuItem: MenuItemComponent, private _elementRef: ElementRef) {}

    /** @hidden */
    ngAfterViewInit(): void {
        this._hideOnMobile();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @hidden */
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
