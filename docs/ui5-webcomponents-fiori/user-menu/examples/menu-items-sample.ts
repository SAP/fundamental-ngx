import { Component, signal } from '@angular/core';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { ShellBar } from '@fundamental-ngx/ui5-webcomponents-fiori/shell-bar';
import { ShellBarBranding } from '@fundamental-ngx/ui5-webcomponents-fiori/shell-bar-branding';
import { UserMenu } from '@fundamental-ngx/ui5-webcomponents-fiori/user-menu';
import { UserMenuItem } from '@fundamental-ngx/ui5-webcomponents-fiori/user-menu-item';
import { Avatar } from '@fundamental-ngx/ui5-webcomponents/avatar';

// Import icons
import '@ui5/webcomponents-icons/dist/bell.js';
import '@ui5/webcomponents-icons/dist/collaborate.js';
import '@ui5/webcomponents-icons/dist/customer.js';
import '@ui5/webcomponents-icons/dist/journey-change.js';
import '@ui5/webcomponents-icons/dist/settings.js';
import '@ui5/webcomponents-icons/dist/sys-help.js';

@Component({
    selector: 'ui5-doc-user-menu-menu-items-sample',
    templateUrl: './menu-items-sample.html',
    standalone: true,
    imports: [UserMenu, UserMenuItem, ShellBar, ShellBarBranding, Avatar]
})
export class MenuItemsSample {
    menuOpen = signal(false);

    onProfileClick(): void {
        this.menuOpen.set(true);
    }

    onItemClick(event: UI5WrapperCustomEvent<UserMenu, 'ui5ItemClick'>): void {
        console.log('Menu item clicked:', event.detail.item.text);
    }

    onClose(): void {
        this.menuOpen.set(false);
    }
}
