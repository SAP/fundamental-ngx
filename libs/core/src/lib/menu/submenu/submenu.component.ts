import { Component, ContentChildren, QueryList, TemplateRef, ViewChild } from '@angular/core';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { MenuService } from '../services/menu.service';

@Component({
    selector: 'fd-submenu',
    template: `
        <ng-template>
            <ng-content></ng-content>
        </ng-template>
    `,
    exportAs: 'fdSubmenu'
})
export class SubmenuComponent {
    /** @hidden Reference to template with Submenu items  */
    @ViewChild(TemplateRef) templateRef: TemplateRef<any>;

    /** @hidden Reference to Submenu MenuItems  */
    @ContentChildren(MenuItemComponent) menuItems: QueryList<MenuItemComponent>;

    /** @hidden Reference to MenuService used by MenuItems */
    menuService: MenuService;
}
