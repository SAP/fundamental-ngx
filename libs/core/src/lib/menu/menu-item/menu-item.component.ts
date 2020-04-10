import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    Host,
    HostListener,
    Input,
    QueryList,
    TemplateRef
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuComponent } from '../menu.component';
import { MenuTitleDirective } from '../directives/menu-title.directive';
import { DefaultMenuItem } from '../default-menu-item.class';
import { MenuLinkDirective } from '../directives/menu-link.directive';

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
        '[attr.aria-expanded]': 'subLevelVisible$.value'
    }
})
export class MenuItemComponent implements DefaultMenuItem {

    /** Menu item id attribute value */
    @Input()
    itemId: string = `fd-menu-item-${menuUniqueId++}`;

    /** Reference to sub menu template */
    @Input()
    subMenu: TemplateRef<any>;

    /** @hidden Reference to menu item title */
    @ContentChild(MenuTitleDirective)
    menuItemTitle: MenuTitleDirective;

    /** @hidden Reference to menu item title */
    @ContentChild(MenuLinkDirective)
    menuLink: MenuLinkDirective;

    /** @hidden Reference to menu item title */
    @ContentChildren(MenuItemComponent)
    subMenuItems: QueryList<MenuItemComponent>;

    /** @hidden */
    subLevelVisible$ = new BehaviorSubject<boolean>(false);

    /** @hidden Close sub menus when any parent element clicked */
    @HostListener('document:click', ['$event'])
    onDocumentClicked(event): void {
        if (!this._elementRef.nativeElement.contains(event.target)) {
            this.subLevelVisible$.next(false);
        }
    }

    /** @hidden Handle click if Menu is displayed in mobile mode */
    @HostListener('click')
    onMobileItemClicked() {
        if (this.subMenu && this._menuComponent.mobile) {
            this._menuComponent.loadView(
                {
                    title: this.menuItemTitle ? this.menuItemTitle.title : '',
                    template: this.subMenu
                })
        }
    };

    /** @hidden */
    constructor(@Host() private _menuComponent: MenuComponent,
                private _elementRef: ElementRef) {
    }

    /** Whether menu item has popup (desktop mode)  */
    get hasPopup(): boolean {
        return this.subMenu && !this._menuComponent.mobile;
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
}
