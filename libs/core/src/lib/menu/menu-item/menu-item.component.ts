import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    Input,
    OnDestroy
} from '@angular/core';
import { MenuTitleDirective } from '../directives/menu-title.directive';
import { DefaultMenuItem } from '../default-menu-item.class';
import { MenuLinkDirective } from '../directives/menu-link.directive';
import { SubMenuComponent } from '../../..';
import { MenuService } from '../services/menu.service';
import { Subscription } from 'rxjs';

let menuUniqueId: number = 0;

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'li[fd-menu-item]',
    exportAs: 'fd-menu-item',
    templateUrl: './menu-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.fd-menu__item]': 'true',
        '[attr.aria-controls]': 'itemId',
        '[attr.aria-haspopup]': 'hasPopup',
        '[attr.aria-expanded]': 'subLevelVisible'
    }
})
export class MenuItemComponent implements DefaultMenuItem, AfterContentInit, OnDestroy {

    /** Menu item id attribute value */
    @Input()
    itemId: string = `fd-menu-item-${menuUniqueId++}`;

    /** Reference to sub menu template */
    @Input()
    subMenu: SubMenuComponent;

    /** @hidden Reference to menu item title */
    @ContentChild(MenuTitleDirective)
    menuItemTitle: MenuTitleDirective;

    /** @hidden Reference to menu item title */
    @ContentChild(MenuLinkDirective)
    menuLink: MenuLinkDirective;

    /** @hidden */
    subLevelVisible: boolean = false;

    private _subscriptions: Subscription = new Subscription();

    /** @hidden */
    constructor(public elementRef: ElementRef,
                private _menuService: MenuService,
                private _changeDetectorRef: ChangeDetectorRef) {
    }

    ngAfterContentInit() {
        this._listenOnMenuLinkState();
    }

    ngOnDestroy() {
        this._subscriptions.unsubscribe();
    }

    /** Whether menu item has popup (desktop mode)  */
    get hasPopup(): boolean {
        return this.subMenu && !this._menuService.menu.mobile;
    }

    focus(): void {
        if (this.menuLink) {
            this.menuLink.elementRef.nativeElement.focus();
        }
    }

    click(): void {
        if (this.menuLink) {
            this.menuLink.elementRef.nativeElement.click();
        }
    }

    open() {
        this.menuLink.setSelected(true);
        this.subLevelVisible = true;
        this._changeDetectorRef.markForCheck();
    }

    close() {
        this.menuLink.setSelected(false);
        this.subLevelVisible = false;
        this._changeDetectorRef.markForCheck();
    }

    private _listenOnMenuLinkState(): void {
        this._subscriptions.add(
            this.menuLink.selectionChange
                .subscribe(isSelected => this._menuService.setActive(isSelected, this))
        )
    }
}
