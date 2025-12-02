import { Component, signal } from '@angular/core';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Menu } from '@fundamental-ngx/ui5-webcomponents/menu';
import { MenuItem } from '@fundamental-ngx/ui5-webcomponents/menu-item';

@Component({
    selector: 'ui5-menu-basic-sample',
    templateUrl: './basic-sample.html',
    standalone: true,
    imports: [Menu, MenuItem, Button]
})
export class BasicSample {
    isMenuOpen = signal(false);

    openMenu(): void {
        this.isMenuOpen.set(true);
    }

    closeMenu(): void {
        this.isMenuOpen.set(false);
    }
}
