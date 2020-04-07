import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ElementRef, Host,
    HostListener,
    Input,
    TemplateRef
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuComponent } from '../menu.component';
import { MenuTitleDirective } from '../directives/menu-title.directive';

let menuUniqueId: number = 0;

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'li[fd-menu-item-component]',
    exportAs: 'fd-menu-item-component',
    templateUrl: './menu-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[attr.aria-controls]': 'itemId',
        '[attr.aria-haspopup]': 'hasPopup'
    }
})
export class MenuItemComponent {

    /** Menu item id attribute value */
    @Input()
    itemId: string = `fd-menu-item-${menuUniqueId++}`;

    /** Reference to sub menu template */
    @Input()
    subMenu: TemplateRef<any>;

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
        if (this.subMenu && this._menuComponent.mobile) {
            this._menuComponent.loadView({title: this.menuItemTitle.title, template: this.subMenu})
        }
    };

    /** @hidden */
    constructor(private _elementRef: ElementRef,
                @Host() private _menuComponent: MenuComponent) {
    }

    /** Whether menu item has popup (desktop mode)  */
    get hasPopup(): boolean {
        return this.subMenu && !this._menuComponent.mobile;
    }
}
