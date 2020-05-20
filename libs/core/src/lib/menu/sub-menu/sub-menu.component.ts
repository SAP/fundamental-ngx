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
    @ViewChild(TemplateRef) templateRef: TemplateRef<any>;

    @ContentChildren(MenuItemComponent) menuItems: QueryList<MenuItemComponent>;

    menuService: MenuService;
}
