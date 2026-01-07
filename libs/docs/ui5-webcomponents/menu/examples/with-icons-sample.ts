import { Component, signal } from '@angular/core';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Menu } from '@fundamental-ngx/ui5-webcomponents/menu';
import { MenuItem } from '@fundamental-ngx/ui5-webcomponents/menu-item';

// Import icons
import '@ui5/webcomponents-icons/dist/action-settings.js';
import '@ui5/webcomponents-icons/dist/copy.js';
import '@ui5/webcomponents-icons/dist/delete.js';
import '@ui5/webcomponents-icons/dist/document.js';
import '@ui5/webcomponents-icons/dist/menu.js';
import '@ui5/webcomponents-icons/dist/open-folder.js';
import '@ui5/webcomponents-icons/dist/paste.js';
import '@ui5/webcomponents-icons/dist/save.js';

@Component({
    selector: 'ui5-menu-with-icons-sample',
    templateUrl: './with-icons-sample.html',
    standalone: true,
    imports: [Menu, MenuItem, Button]
})
export class WithIconsSample {
    isMenuOpen = signal(false);

    openMenu(): void {
        this.isMenuOpen.set(true);
    }

    closeMenu(): void {
        this.isMenuOpen.set(false);
    }
}
