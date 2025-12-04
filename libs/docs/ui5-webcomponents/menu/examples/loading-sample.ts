import { Component, signal } from '@angular/core';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Menu } from '@fundamental-ngx/ui5-webcomponents/menu';
import { MenuItem } from '@fundamental-ngx/ui5-webcomponents/menu-item';

// Import icons
import '@ui5/webcomponents-icons/dist/employee.js';
import '@ui5/webcomponents-icons/dist/sys-enter-2.js';
import '@ui5/webcomponents-icons/dist/sys-enter.js';

@Component({
    selector: 'ui5-menu-loading-sample',
    templateUrl: './loading-sample.html',
    standalone: true,
    imports: [Menu, MenuItem, Button]
})
export class LoadingSample {
    isMenuOpen = signal(false);
    isLoading = signal(false);

    openMenu(): void {
        this.isMenuOpen.set(true);
        this.isLoading.set(true);

        // Simulate data loading
        setTimeout(() => {
            this.isLoading.set(false);
        }, 2000);
    }

    closeMenu(): void {
        this.isMenuOpen.set(false);
    }
}
