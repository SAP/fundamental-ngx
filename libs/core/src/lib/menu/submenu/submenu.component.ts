import { Component, ContentChildren, Input, QueryList, TemplateRef, ViewChild } from '@angular/core';
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

    /** Aria-label for navigation */
    @Input()
    ariaLabel: string = null;

    /** Aria-Labelledby for element describing navigation */
    @Input()
    ariaLabelledby: string = null;

    /** @hidden Reference to template with Submenu items  */
    @ViewChild(TemplateRef) templateRef: TemplateRef<any>;

    /** @hidden Reference to Submenu MenuItems  */
    @ContentChildren(MenuItemComponent) menuItems: QueryList<MenuItemComponent>;

    /** @hidden Reference to MenuService used by MenuItems */
    menuService: MenuService;
}
