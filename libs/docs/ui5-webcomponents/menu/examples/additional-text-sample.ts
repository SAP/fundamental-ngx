import { Component, signal } from '@angular/core';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Menu } from '@fundamental-ngx/ui5-webcomponents/menu';
import { MenuItem } from '@fundamental-ngx/ui5-webcomponents/menu-item';

// Import icons
import '@ui5/webcomponents-icons/dist/action-settings.js';
import '@ui5/webcomponents-icons/dist/add-document.js';
import '@ui5/webcomponents-icons/dist/add-folder.js';
import '@ui5/webcomponents-icons/dist/journey-arrive.js';
import '@ui5/webcomponents-icons/dist/open-folder.js';
import '@ui5/webcomponents-icons/dist/slim-arrow-down.js';

@Component({
    selector: 'ui5-menu-additional-text-sample',
    templateUrl: './additional-text-sample.html',
    standalone: true,
    imports: [Menu, MenuItem, Button]
})
export class AdditionalTextSample {
    isMenuOpen = signal(false);

    openMenu(): void {
        this.isMenuOpen.set(true);
    }

    closeMenu(): void {
        this.isMenuOpen.set(false);
    }
}
