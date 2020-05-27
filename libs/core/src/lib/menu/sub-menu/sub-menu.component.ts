import { Component, ContentChildren, QueryList, TemplateRef, ViewChild } from '@angular/core';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { MenuService } from '../services/menu.service';

@Component({
    selector: 'fd-sub-menu',
    template: `
        <ng-template>
            <ng-content></ng-content>
        </ng-template>
    `,
    exportAs: 'fdSubMenu'
})
export class SubMenuComponent {
    /** @hidden Reference to template with SubMenu items  */
    @ViewChild(TemplateRef) templateRef: TemplateRef<any>;

    /** @hidden Reference to SubMenu MenuItems  */
    @ContentChildren(MenuItemComponent) menuItems: QueryList<MenuItemComponent>;

    /** @hidden Reference to MenuService used by MenuItems */
    menuService: MenuService;
}
