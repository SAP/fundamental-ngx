import { Component, signal } from '@angular/core';
import { ShellBar } from '@fundamental-ngx/ui5-webcomponents-fiori/shell-bar';
import { ShellBarBranding } from '@fundamental-ngx/ui5-webcomponents-fiori/shell-bar-branding';
import { UserMenu } from '@fundamental-ngx/ui5-webcomponents-fiori/user-menu';
import { UserMenuAccount } from '@fundamental-ngx/ui5-webcomponents-fiori/user-menu-account';
import { UserMenuItem } from '@fundamental-ngx/ui5-webcomponents-fiori/user-menu-item';
import { Avatar } from '@fundamental-ngx/ui5-webcomponents/avatar';

import '@ui5/webcomponents-icons/dist/action-settings.js';
import '@ui5/webcomponents-icons/dist/message-information.js';

@Component({
    selector: 'ui5-doc-user-menu-non-interactive-avatar-sample',
    templateUrl: './non-interactive-avatar-sample.html',
    standalone: true,
    imports: [UserMenu, UserMenuAccount, UserMenuItem, ShellBar, ShellBarBranding, Avatar]
})
export class NonInteractiveAvatarSample {
    menuOpen = signal(false);

    onProfileClick(): void {
        this.menuOpen.set(true);
    }

    onClose(): void {
        this.menuOpen.set(false);
    }

    onAvatarClick(): void {
        alert('Avatar clicked!');
    }
}
