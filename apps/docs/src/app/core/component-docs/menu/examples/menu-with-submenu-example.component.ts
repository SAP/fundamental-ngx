import { Component } from '@angular/core';
import { MenuItemComponent } from '@fundamental-ngx/core/menu';

@Component({
    selector: 'fd-menu-with-submenu-example',
    templateUrl: './menu-with-submenu-example.component.html'
})
export class MenuWithSubmenuExampleComponent {
    activePath: MenuItemComponent[] = [];
}
