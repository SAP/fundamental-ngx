import { Component, ContentChild, ElementRef, HostListener, Input, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TemplateDirective } from '../../utils/directives/template/template.directive';
import { MenuComponent } from '../menu.component';
import { MenuTitleDirective } from '../directives/menu-title.directive';

let menuUniqueId: number = 0;

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'li[fd-menu-item-component]',
    exportAs: 'fd-menu-item-component',
    templateUrl: './menu-item.component.html',
    host: {
        '[attr.aria-controls]': 'itemId',
        '[attr.aria-haspopup]': 'hasPopup'
    }
})
export class MenuItemComponent {

    /** Menu item id attribute value */
    @Input()
    itemId: string = `fd-menu-item-${menuUniqueId++}`;

    /** @hidden Reference to sub menu template */
    @ContentChild(TemplateDirective, {read: TemplateRef})
    subMenuTemplate: TemplateRef<any>;

    /** @hidden Reference to menu item title */
    @ContentChild(MenuTitleDirective)
    menuItemTitle: MenuTitleDirective;

    /** @hidden */
    public subLevelVisible$ = new BehaviorSubject<boolean>(false);

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
        if (this.hasSubMenu && this._menuComponent.mobile) {
            this._menuComponent.loadView({title: this.menuItemTitle.title, template: this.subMenuTemplate})
        }
    };

    /** @hidden */
    constructor(private _elementRef: ElementRef,
                private _menuComponent: MenuComponent) {
    }

    /** Whether menu item has sub menu  */
    get hasSubMenu(): boolean {
        return !!this.subMenuTemplate;
    }

    /** Whether menu item has popup (desktop mode)  */
    get hasPopup(): boolean {
        return this.hasSubMenu && !this._menuComponent.mobile;
    }
}
