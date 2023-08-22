import { Component } from '@angular/core';
import { MenuItemComponent } from '@fundamental-ngx/core/menu';
import { NgFor, NgTemplateOutlet, NgIf } from '@angular/common';
import { MenuModule } from '@fundamental-ngx/core/menu';
import { ButtonModule } from '@fundamental-ngx/core/button';

@Component({
    selector: 'fd-menu-with-submenu-example',
    templateUrl: './menu-with-submenu-example.component.html',
    standalone: true,
    imports: [ButtonModule, MenuModule, NgFor, NgTemplateOutlet, NgIf]
})
export class MenuWithSubmenuExampleComponent {
    activePath: MenuItemComponent[] = [];

    complexActivePath: MenuItemComponent[] = [];

    complexMenuItems = [
        {
            title: 'Menu Item 1',
            children: []
        },
        {
            title: 'Menu Item 2',
            children: [
                {
                    title: 'Menu Item 2.1',
                    children: []
                }
            ]
        },
        {
            title: 'Menu Item 3',
            children: [
                {
                    title: 'Menu Item 3.1',
                    children: [
                        {
                            title: 'Menu Item 3.1.1',
                            children: []
                        }
                    ]
                }
            ]
        },
        {
            title: 'Menu Item 4',
            children: [
                {
                    title: 'Menu Item 4.1',
                    children: [
                        {
                            title: 'Menu Item 4.1.1',
                            children: [
                                {
                                    title: 'Menu Item 4.1.1.1',
                                    children: []
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ];
}
